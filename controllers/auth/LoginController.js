import bcrypt from "bcrypt";
import User from "../../models/User.js";
import Controller from "../Controller.js";
import { encodeToken } from "../../lib/jwt.js";

class LoginController extends Controller {
    // This endpoints generates and returns a JWT access token given authentication data.
    async login(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ "email": email }).then((user) => {
            if (!user) {
                this.responder(res).error('email', "User not found").respond(401);
                return;
            }
            return user;
        });

            if(user) {
                await bcrypt.compare(password, user.password, (err, result) => {
                if(result) {
                    const accessToken = encodeToken({ userId: user.id });
                    return this.responder(res).success({user: User.allowedValues(user), access_token: accessToken}).respond()
                }
                return this.responder(res).error('password', "Password is incorrect").respond(401)
            });
            }
            
        }

}

export default LoginController =  new LoginController();