import dotenv from "dotenv";
dotenv.config(); // Reach out to the environmental variable file

export default {
    sender_id: process.env.ARKESEL_SMS_SENDER_ID || "Hello",
    api_key: process.env.ARKESEL_SMS_API_KEY || "khg28y2hna*nqbhw*",
    
}