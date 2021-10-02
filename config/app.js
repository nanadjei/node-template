import dotenv from "dotenv";
dotenv.config(); // Reach out to the environmental variable file

export default {
    appSecret: process.env.APP_SECRET || "19h4g34okhg28y2hna*nqub$TW@Qbabq!wut38272gvwhsbhw*@Ygqwi",
    serverPort: process.env.SERVER_PORT || 9000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    
    // Pusher configurations
    pusher: {
        appId: process.env.PUSHER_APP_ID || "y0uRPushErApp1D",
        key: process.env.PUSHER_KEY || "Y0uRpUsheRkeY",
        secret: process.env.PUSHER_SECRET || "Y0uRPusheRs3cr37",
        cluster: process.env.PUSHER_CLUSTER || "pUsh3rC1aS73r",
        useTLS: process.env.PUSHER_USE_TLS || "us37CL"
    },
    otp: {
        cacheTTL: process.env.OTP_CACHE_TTL || 10000
    }
}