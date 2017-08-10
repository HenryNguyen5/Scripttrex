import twilio from "twilio";
import opts from "../configs/twilio-opts.js"

let client =  new twilio(opts.accountSid, opts.authToken);

export default class Notify {
	constructor() {}
	
	public notify(message) {
		opts.phonesToNotify.forEach(num => {
			client.messages.create({
				body: message,
				to: num, 
				from: opts.number
			});
		});
	}
};