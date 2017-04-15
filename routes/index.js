const express = require('express');
const router = express.Router();

const { Store } = require('./../models/store');
const { User }  = require('./../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/about-us', (req, res, next) => {
  res.render('about-us');
});

router.get('/store-sign-up', (req, res, next) => {
  res.render('store-sign-up');
});

router.post('/store-sign-up', (req, res, next) => {
  Store.create(req.body)
    .then((store) => {
      res.redirect('success');
    })
    .catch((error) => res.render('store-sign-up', {error: ' '}));

});

router.get('/user-sign-up', (req, res, next) => {
  res.render('user-sign-up');
});

router.post('/user-sign-up', (req, res, next) => {
  User.create(req.body)
    .then((user) => {

      User.findOne({_id: user._id})
        .then((user2) => {
          user2.email = req.body.email;
          user2.address = req.body.address;

          user.save();

          res.redirect('/success');
        })

    })
    .catch((error) => console.log(error));
});

router.get('/success', (req, res) => {
  res.render('success');
});

module.exports = router;
