const mongoose = require('mongoose');

const Store = mongoose.model('Store', {
  name        : String,
  address     : String,
  phone       : String,
  email       : String,
  password    : String,
  info        : String,
  image       : String,
  food_types  : { type: Array, default: [] },
  subscribers : { type: Array, default: [] }
});

module.exports = { Store };
