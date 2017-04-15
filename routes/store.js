const express = require('express');
const router = express.Router();

const { User }  = require('./../models/user');
const { Store }  = require('./../models/store');
const { sendNotice } = require('./../helpers/mailer');
const Twilio = require('./../helpers/twilio');

/* GET home page. */
router.get('/:id', (req, res, next) => {
  Store.findOne({_id: req.params.id})
    .then((store) => {
      res.render('store/store', {store});
    })
    .catch((error) => console.log(error));
});

router.post('/:id', (req, res, next) => {
  Store.findOne({_id: req.params.id})
    .then((store) => {
      // use mailgun to send body object, store, and list of emails under a store
      // get list of emails under a store
      let promises = [];
      let emails  = [];
      let numbers = [];

      for (let i = 0; i < store.subscribers.length; i++) {
        promises.push(User.findOne({_id: store.subscribers[i]}).then((user) => {
          emails.push(user.email);
          numbers.push(user.phone);
        }))
      }

      Promise.all(promises).then(() => {
        Twilio.sendManyMessages(numbers, req.body, store, (error) => console.log(error));
        sendNotice(emails, store, req.body);
        res.render('store/store', {store, completed: ' '});
      });
    })
    .catch((error) => console.log(error));
});


router.get('/:id/edit', (req, res) => {
  Store.findOne({_id: req.params.id})
    .then((store) => {
      res.render('store/edit', {store})
    })
    .catch((error) => console.log(error));

});

router.post('/:id/edit', (req, res) => {
  // store image and upload to S3
  let image = req.body.image;
  delete req.body.image;

  req.body.food_types = req.body.food_types.split(', ');

  Store.findOneAndUpdate({_id: req.params.id}, req.body)
    .then((store) => {
      console.log(store);
      res.redirect(`/stores/${req.params.id}`);
    })
    .catch((error) => console.log(error));

});

module.exports = router;
