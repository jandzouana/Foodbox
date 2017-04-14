const mongoose = require('mongoose');

const Store = mongoose.model('Store', {
  name        : String,
  address     : String,
  phone       : String,
  email       : String,
  info        : String,
  food_type   : { type: Array, default: [] },
  subscribers : { type: Array, default: [] },
});

module.exports { Store };
