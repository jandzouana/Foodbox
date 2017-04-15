const mongoose = require('mongoose');

const User = mongoose.model('User', {
  first_name   : String,
  last_name    : String,
  organization : String,
  password     : String,
  phone        : String,
  stores       : { type: Array, defualt: []}
});

module.exports = { User };
