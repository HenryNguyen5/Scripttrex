var twilio = require("twilio");

var phones = [],
  client;

module.exports = {
  new: function(numbers, accountSid, authToken) {
    phones = numbers;
    client = new twilio(accountSid, authToken);
  },
  notify: function(coin) {
    phones.forEach(num => {
      client.messages
        .create({
          body: `${coin} has hit bittrex!`,
          to: num, // Text this number
          from: "+18738000941"
        })
        .then(message => console.log(message.sid));
    });
  }
};