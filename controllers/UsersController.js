import bcrypt from "bcrypt";
import User from "../models/User.js";
import Controller from "./Controller.js";

class UsersController extends Controller {
    
    /** Fetch all resources
     * @param { object } res object represents the HTTP response that an Express app sends when it gets an HTTP request
     * @return JSON of the retrieved users.
     */
    index = async (res) => {
        await User.find((err, data) => {
            return !err ? 
                this.responder(res).success(data).respond() : 
                this.responder(res).error('users', "An error occured trying to get users").respond(500);
        })
    }

    /** Fetch all resources
     * @param { object } req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
     * @param { object } res object represents the HTTP response that an Express app sends when it gets an HTTP request
     * @return JSON of the created user.
     */
    store = async (req, res) => {
        User.findOne({ email: req.body.email }).then((user) => {
            if(user) {
                throw new Error("User already exists");
            }
        return bcrypt.hash(req.body.password, 12);
        }).then((hashedPassword))
        const user = new User({
            firstName: req.data.firstName,
            lastName: req.data.lastName,
            email: req.data.email,
            password: hashedPassword,
        });
        return user.save()
            .then(res => this.responder(res).success(data).respond(201))
            .catch(err => this.responder(res).error('message', err).respond(500));
    }
};

export default UsersController = new UsersController();
