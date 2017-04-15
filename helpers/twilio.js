const accountSid = 'ACc6d70463c59d2eb836f8eec711b9f68e';
const authToken  = 'c9f079c09fe664323cd46e8a61526a6a';
const client     = require('twilio')(accountSid, authToken);

exports.sendManyMessages = (recipients, message, callback) => {
  recipients.forEach((recipient) => {
    this.send(recipient, message, (error) => callback(recipient, error));
  });
};

exports.send = (phone, message, callback) => {
  // Strip out non-numeric characters from phone number
  phone = phone.replace(/[^\d\+]/g,"");
  client.messages.create({
    to: `+1${phone}`,
    from: "+14154032943",
    body: message,
  }, (errors) => {
    if (errors) callback(errors);
  });
}
