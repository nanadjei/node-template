import axios from 'axios';
import config from "./config/arkesel.js";
/**
 * Arkesel Api docs url: https://sms.arkesel.com/sms/api?action=send-sms&api_key=api_key&to=phone_number&from=sender_id&sms=some_nice_message
 */

export default class Arkesel
{
    /** Package version @return string */
    VERSION = "0.1.0";

    /** Url for sending sms */
    SMS_ENDPOINT = "https://sms.arkesel.com/sms/api";

    /** Then name of the sender */
    sender_id;

    api_key;

    to;

    message;

    /** For the purpose of scheduling the messsage */
    date_time;

    client;

    constructor(sender_id = null, api_key = null)
    {
        this.sender_id = sender_id || config.sender_id;

        this.api_key =  api_key || config.api_key;

        this.client = axios.create({
            baseURL: this.SMS_ENDPOINT,
            timeout: 5000,
            headers: {'Content-type': 'application/json'}
        });
    }

    /** 
     * @param { String } senderId is the name that will oppear on the receiver's phone.
     * This can be overwritten.
     */
    setSenderId(senderId)
    {
        this.sender_id = senderId;

        return $this;
    }

    /**
     * Get sender Id
     */
    getSenderId() 
    {
        return this.sender_id;
    }

    /**
     * Specify who is sending the sms
     * @param { String } senderId is the name that will oppear on the receiver's phone.
     */
    from(senderId) 
    {
        this.setSenderId(senderId);
        return this;
    }

    /** 
     * Get the api key of the 
     * @return string
     */
    getApiKey()
    {
        return this.api_key;
    }

    /**
     * You can send sms with different api key.
     * @param apiKey is the fresh api key;
     */
    withFreshApiKey(apiKey)
    {
        this.api_key = apiKey;
        
        return $this;
    }

    /**
     * Send Sms to Phone number
     * @param  int to recepient phone number.
     * @param  string message    messge to be sent.
     * @param  string dateTime 	schedule.
     */
    async send(to = null, message = null, dateTime = null, response)
	{  
		this.to = to || this.to;
		this.message = message || this.message; 
		this.dateTime = dateTime || this.dateTime;

		//prepare url
        const url = this.SMS_ENDPOINT + '?'
            + "action=send-sms"
            + "&api_key="+ this.getApiKey()
            + "&to=" + this.to 
            + "&sms="+ encodeURI(this.message) 
            + "&from=" + this.getSenderId() ;
	
		if( (dateTime) ) url + '&schedule=' + encodeURI(dateTime) ;
                    
        /**∫
         * successful response
         * {"code":"ok","message":"Successfully Send","balance":17707,"user":"Qodehub Limited"}
         * 
         * error: 
         * {"code":"102","message":"Authentication Failed"}
         */

        // Send request to arkesel
        await this.client.get(url).then((res) => {
            if(res.data['code'] && res.data['code'] === 'ok') {
                return response(res.data);
            }
            throw new Error(res.data.message);
        });
	}	 

    /**
     * Check sms balance.
     */
    async balance(response)
    {
        const url = this.SMS_ENDPOINT + `?action=check-balance&api_key=${this.getApiKey()}&response=json`
        // Send request to arkesel
        await this.client.get(url).then((res) => {
            if(!res.data.balance && res.data['code']) {
                throw new Error(res.data.message);
            }
                return response(res.data.balance);
        });
    }

    /** 
     * Schedule sms to be sent in future.
     * @param to is the destination number to deliver the message.
     * @param message is the kind of message ot deliver.
     * @param dateTime is the timestamp to send the message.
     */
    schedule(to = null, message = null, dateTime)
    {
        return this.send(to, message, dateTime);
    }
}
