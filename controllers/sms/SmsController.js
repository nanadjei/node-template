import Controller from "../Controller.js";
import Arkesel from "../../lib/arkesel/Arkesel.js";

class SmsController extends Controller {

    /** Send new sms
     * After newing up the instance of Arkesel and calling the send method
     * there are a couple of params you need to pass.
     * 1st param; to - Eg; +2330123456789 is the number you want to send the sms to.
     * 2nd param; message - The message to be delivered.
     * 3rd param; dateTime - Specify a date and time provided you want to schedule the sms to be send later. 
     * 4th param; a callback function that will return the value from the Arkesel class
     * @return res.json
     */
    send(res) {
        new Arkesel().send("0501431462", "Just wanted to say hello !", null, (data) => {
            return this.responder(res).success(data).respond(200);
        }); 
    }

    /** Check sms 
     * After newing up the instance of Arkesel and calling the balance method
     * there are a params you need to pass.
     * Just pass in a callback function that will return the value from the balance method of arkesel lib
    */
    checkBalance(res) {
        new Arkesel().balance((data) => {
            return this.responder(res).success({'balance': data}).respond(200);
        });
    }
}

export default new SmsController();