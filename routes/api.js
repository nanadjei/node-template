import express from "express";
const Route = express.Router();
import { isAuthenticatedMiddleware } from '../lib/jwt.js';

import UsersController from "../controllers/UsersController.js";
import LoginController from "../controllers/auth/LoginController.js";
import RegisterController from "../controllers/auth/RegisterController.js";
import SmsController from "../controllers/sms/SmsController.js";
import PhoneVerificationController from "../controllers/sms/PhoneVerificationController.js";


/** Get all users */
Route.get('/users', isAuthenticatedMiddleware, (_, res) => {
    return UsersController.index(res);
});

Route.post('/auth/login', (req, res) => {
    return LoginController.login(req, res);
});

Route.post('/auth/register', (req, res) => {
    return RegisterController.create(req, res);
});

Route.post('/auth/otp/verify', (req, res) => {
    return RegisterController.verifyOtp(req, res);
});

Route.get('/sms/check/balance', (_, res) => {
    return SmsController.checkBalance(res);
});

Route.get('/sms/send', (_, res) => {
    return SmsController.send(res);
});

Route.post('/phone/send/otp', (req, res) => {
    return PhoneVerificationController.create(req,res);
});

Route.put('/phone/verify/otp', (req, res) => {
    return PhoneVerificationController.verify(req,res);
});


export default Route;
