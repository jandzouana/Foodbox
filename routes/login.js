const express   = require('express');
const router    = express.Router();

const { Store } = require('./../models/store');
const { User }  = require('./../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {

  res.render('login', { title: 'User login' });
  req.session.userLoggedIn = true;
});

router.post('/', (req, res) => {
  let email    = req.body.email;
  let password = req.body.password;

  // First search User model for email and password
  User.findOne({email, password})
    .then((user) => {
      if (user !== null) {
        req.session.userLoggedIn = true;
        res.redirect(`/users/${user._id}`);
      } else {
        Store.findOne({email, password})
          .then((store) => {
            if (store !== null) {
              req.session.storeLoggedIn = true;
              res.redirect(`/stores/${store._id}`);
            } else {
               res.render('login', {error: ' '});
            }
          }).catch((error) => res.render('login', {error: ' '}));
      }
    })
    .catch((error) => res.render('login', {error: ' '}));
});

module.exports = router;
