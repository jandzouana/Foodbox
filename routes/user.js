const express = require('express');
const router  = express.Router();
const _       = require('lodash');

const { User }  = require('./../models/user');
const { Store }  = require('./../models/store');

/* GET home page. */
router.get('/:id', (req, res, next) => {
  // Find all stores
  Store.find({})
    .then((stores) => {
      User.findOne({_id: req.params.id})
        .then((user) => {
          res.render('user', {user, stores});
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));


});

router.post('/:id', (req, res) => {
  User.findOne({_id: req.params.id})
    .then((user) => {
      console.log(req.body.store_id);
      user.subscriptions.push(req.body.store_id);
      user.save();

      Store.findOne({_id: req.body.store_id})
        .then((store) => {
          store.subscribers.push(user._id);
          store.save();

          res.redirect(`/users/${req.params.id}`);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
});

router.get('/:id/profile', (req, res, next) => {
  User.findOne({_id: req.params.id})
    .then((user) => {
        let promises = [];
        let stores   = [];

        for (let i = 0; i < user.subscriptions.length; i++) {
          promises.push(Store.findOne({_id: user.subscriptions[i]}).then((store) => stores.push(store)));
        }

        Promise.all(promises).then(() => {
          res.render('user-profile', {user, stores});
        });

    })
    .catch((error) => console.log(error));
});

router.post('/:id/profile', (req, res, next) => {
  User.findOne({_id: req.params.id})
    .then((user) => {
        let promises = [];
        let stores   = [];

        for (let i = 0; i < user.subscriptions.length; i++) {
          let index = user.subscriptions.indexOf(req.body.store_id);

          if (index > -1) user.subscriptions.splice(index, 1);
        }

        user.save();
        res.redirect(`/users/${req.params.id}/profile`);

    })
    .catch((error) => console.log(error));
});

router.get('/:id/stores/:store_id', (req, res, next) => {
  Store.findOne({_id: req.params.store_id})
    .then((store) => {
      User.findOne({_id: req.params.id})
        .then((user) => {
          res.render('store-more-info', {user, store});
        })
        .catch((errors) => console.log(errors));
    })
    .catch((error) => console.log(error));
});

module.exports = router;
