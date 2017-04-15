const nodemailer   = require('nodemailer');
const hbs          = require('nodemailer-express-handlebars');
const mg           = require('nodemailer-mailgun-transport');
const fs           = require('fs');
const Handlebars   = require('handlebars');

// Options
var options = {
 viewEngine: {
     extname: '.hbs',
     layoutsDir: 'views/email/',
     defaultLayout : 'template',
     partialsDir : 'views/partials/'
 },
 viewPath: 'views/email/',
 extName: '.hbs'
};

// Mailgun Authorization
var auth = {
  auth: {
    api_key: 'key-c07ad2c51f9c04814413d517bdd4d5e4',
    domain: 'mg.getfitpin.com'
  }
};

var nodemailerMailgun = nodemailer.createTransport(mg(auth));
nodemailerMailgun.use('compile', hbs(options));

// pass in the store sending the notice and
//  the item (an object) containing all the data they
//  want to share with their users
var sendNotice = (emails, store, item) => {
  let results = [];
  for (let i = 0; i < emails.length; i++) {
    let obj = { address: `${emails[i]}` };
    results.push(obj)
  }

  nodemailerMailgun.sendMail({
    from: 'notice@foodbox.com',
      to: 'szier@scu.edu',
    subject: `${store.name} has an update for you!`,
    'h:Reply-To': 'noreply@foodbox.com',
    template: 'notice_body',
    context: { store, item }
  }, (err, info) => {
    if (err) console.log(err);
    else nodemailerMailgun.close();
  });
};

module.exports = { sendNotice };
