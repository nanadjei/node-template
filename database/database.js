import mongoose from 'mongoose';
// import "../lib/pusher.js";
import dotenv from "dotenv";
import config from "../config/app.js";
dotenv.config();
const toDb = `mongodb+srv://${config.dbUser}:${config.dbPassword}@cluster0.vsxyn.mongodb.net/${config.dbName}?retryWrites=true&w=majority`;
// const toDb = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.u7vwt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(toDb, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Mongo connected')
})

/** requiring pusher configuration to get messages from our server in realtime */

export default mongoose;

