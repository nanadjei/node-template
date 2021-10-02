import Otp from "../lib/Otp.js";
import Arkesel from "../lib/arkesel/Arkesel.js";
import config from "../config/app.js";

export default class VerifyPhoneNotification extends Otp {
    /**
     * Send the OTP code a user's phone.
     * 
     * @param { Object } user - Models/User.js.
     * @param { String } phone - The phone number that received the sms.
     * @param { Function } callback - A callback function to return results.
     */
    sendTo(user, phone, callback) {
        const code = this.generateFor(user, phone);

        const message = `Hi ${user.name || user.firstName}, Your password reset code is ${code}. Valid for ${config.otp.cacheTTL} minutes`;

        new Arkesel().send(phone, message, null, (payload) => {
            return callback(payload);
        }); 
    }

    /**
     * Confirm the OTP code
     * 
     * @param { String } theFourDigits - The 4 digits code that was sent via sms.
     * @param { Object } user - Models/User.
     * @param { Phone } phone - The phone that received the OTP.
     * @param { Function } callback - A function that will return the results from this.verify method.
     */
    confirm(theFourDigits, user, phone, callback) {
        this.verify(theFourDigits, user, phone, (payload) => {
            // If payload is true.
            // Update user verified_at column to timestamp.
            return callback(payload)
        });
    }
}
