import { responder } from "../lib/responder.js";
import validate from "../lib/validator/validate.js";

export default class Controller {
    constructor() {
        this.validate = validate;
        this.responder = responder;
    }
}
