import mongoose from "mongoose";

const Schema = mongoose.Schema;

/** 
 * Note: TimeStamps can be written in the YY-MM-DD hh:mm:ss format
 * with the help of moment.js. Eg: moment().format('YY-MM-DD hh:mm:ss')
 * Run npm install if you haven't and import moment from 'moment'
 */ 
const UserSchema = Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String },
    emailVerifiedAt: { type: Date },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
});


export default UserSchema;

