import mongoose from 'mongoose';
import Pusher from "pusher";
import config from "../config/app.js";

/** Pusher api credentials */
const pusher = new Pusher({
  appId: config.pusher.appId,
  key: config.pusher.key,
  secret: config.pusher.secret,
  cluster: config.pusher.cluster,
  useTLS: config.pusher.useTLS
});

const db = mongoose.connection;
db.once("open", () => {
    const collection = db.collection("users").watch();

    collection.on("change", (action) => {
        if(action.operationType === 'insert') {
            const data = action.fullDocument;
            pusher.trigger('users', 'inserted', 
            { firstName: data.firstName, lastName: data.lastName, email: data.email }
            )
        } else {
            console.log("Error triggering Pusher");
        }
    })
});
export default pusher;
