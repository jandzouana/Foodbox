const mongoose = require('mongoose');

const User = mongoose.model('User', {
  first_name    : String,
  last_name     : String,
  organization  : String,
  password      : String,
  phone         : String,
  subscriptions : { type: Array, defualt: []}
});

module.exports = { User };
