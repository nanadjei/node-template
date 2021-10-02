import Controller from "../Controller.js";
import VerifyPhoneNotification from '../../notification/VerifyPhoneNotification.js';

class PhoneVerificationController extends Controller {
    /**
     * Send the otp code to the user's phone
     * @param { Object } req - Request object
     * @param { Object } res - Response object
     */
    create(req, res) {
        this.validate(req, res, {'phone': 'required|digits:10'});
        const { phone } = req.body;
        const user = {id: 1, name: "John Doe"}; // You can query for your user by phone

        new VerifyPhoneNotification().sendTo(user, phone, (response) => {
            return this.responder(res).success(response).respond(200);
        });
    }

    /**
     * Verify the otp code
     * @param { Object } req - Request object
     * @param { Object } res - Response object
     */
    verify(req, res) {
        this.validate(req, res, {'phone': 'required|digits:10', 'otp': 'required|digits:4'});
        const { phone, otp } = req.body;
        const user = {id: 1, name: "John Doe"}; // query for your user by phone

        new VerifyPhoneNotification().confirm(otp, user, phone, (response) => {
            // if "response" returns a boolean
            // then update phoneVerifiedAt to true if you are going to implement phone verification 
            return this.responder(res).success({ 'verified': response }).respond(200);
        });
    }
}

export default new PhoneVerificationController();