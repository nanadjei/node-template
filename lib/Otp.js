import bcrypt from "bcrypt";
import redis from "redis";
import config from "../config/app.js";

class Otp  {
    constructor() {
        this.cache = this.redisConnection();
        this.cache.on("connect", () => {
            console.error('Connected to redis server');
        });
    }

    /** Generate new OTP code 
     * @param { Object } user - The user we want to generate the otp for.
     * @param { String } phone - The phone we are generating the otp for.
    */
    generateFor(user, phone) {
        if(typeof user !== "object") {
            throw new Error('Otp requires you to pass in the user object');
        }
        const theFourDigits = Math.floor(1000 + Math.random() * 9000); // Random 4 digits number
        
        /** Hash the user's 4 digit codes and cache its. */
        bcrypt.hash(`${theFourDigits}`, 12, (err, hash) => { 
            if(hash) {
                const key = `${user.id + phone}`;
                this.cache.set(key, hash);
                this.cache.expire(key, 1000 * 60 * config.otp.cacheTTL);
                return;
            }
            throw err;
        });
        return theFourDigits;
    }

    /**
     * 
     * @param { Object } user - The user collection/object
     * @param { String } phone - The phone number to verify the otp against
     * @param { String } theFourDigits - The actual otp code
     */
    verify(theFourDigits, user, phone, callback) {
        this.cache.get(`${user.id + phone}`, (err, result) => {
            if (err) throw new Error(err);
            return callback(this.bcryptOtpCode(`${theFourDigits}`, `${result}`));
        });
    }

    bcryptOtpCode(theFourDigits, hash) {
        if(theFourDigits && hash) {
            return bcrypt.compareSync(theFourDigits, hash); 
        }
    }

    redisConnection() {
        return redis.createClient({
            retry_strategy: function(options) {
                if (options.error && options.error.code === "ECONNREFUSED") {
                // End reconnecting on a specific error and flush all commands with
                // a individual error
                return new Error("The server refused the connection");
                }
                if (options.total_retry_time > 1000 * 60 * 60) {
                // End reconnecting after a specific timeout and flush all commands
                // with a individual error
                return new Error("Retry time exhausted");
                }
                if (options.attempt > 10) {
                // End reconnecting with built in error
                return undefined;
                }
                // reconnect after
                return Math.min(options.attempt * 100, 3000);
            },
            });
    }
    
}

export default Otp;