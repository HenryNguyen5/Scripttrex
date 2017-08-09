"use strict";
const twilio_1 = require("twilio");
const twilio_opts_js_1 = require("../configs/twilio-opts.js");
let client = new twilio_1.default(twilio_opts_js_1.default.accountSid, twilio_opts_js_1.default.authToken);
class Notifier {
    constructor() { }
    notify(message) {
        twilio_opts_js_1.default.phonesToNotify.forEach(num => {
            client.messages.create({
                body: message,
                to: num,
                from: twilio_opts_js_1.default.number
            });
        });
    }
}
;
module.exports = Notifier;
//# sourceMappingURL=notify.js.map