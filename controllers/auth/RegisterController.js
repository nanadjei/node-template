import Otp from "../../lib/Otp.js";
import Controller from "../Controller.js";

class RegisterController extends Controller {
    /** Register a new user */
    create(req, res) {
        this.validate(req, res, {"phone": "required|digits:10"}); 
            const { phone } = req.body;
            const code = new Otp().generateFor({id: 2, name: "John Doe"}, phone);

            return code ? 
            this.responder(res).success(code).respond(200) : 
            this.responder(res).error('code', "Otp could not generate").respond(500);
    }

    /** Verify the user's phone */
    verifyOtp(req, res) {
        const validationRule = {
            "phone": "required|digits:10", 
            "code": "required|digits:4"
        }
        this.validate(req, res, validationRule);

        const { phone, code } = req.body;
        new Otp().verify(code, {id: 2, name: "John Doe"}, phone, (result) => {
            return result ? this.responder(res).success(true).respond(200) : 
            this.responder(res).error('code', "Code could not be verified").respond(500);
        });
    }
}

export default new RegisterController;