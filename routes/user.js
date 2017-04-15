const express = require('express');
const router = express.Router();

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

module.exports = router;
