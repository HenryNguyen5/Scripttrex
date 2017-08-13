import * as twilio from 'twilio';
import opts from '../configs/twilio-opts';

export default class Notifier {
	client = twilio(opts.accountSid, opts.authToken)
	opts: {
		phonesToNotify: Array<any>;
	};

	constructor(_opts = opts) {
		this.opts = _opts;
	}

	public notify(message) {
		this.opts.phonesToNotify.forEach(num => {
			this.client.messages.create({
				body: message,
				to: num, 
				from: opts.number
			});
		});
	}
};