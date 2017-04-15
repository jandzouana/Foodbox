const express = require('express');
const router = express.Router();

const { Store } = require('./../models/store');
const { User }  = require('./../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
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

router.get('/success', (req, res) => {
  res.render('success');
});

module.exports = router;
