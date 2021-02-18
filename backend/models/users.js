const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const users = new Schema({
  userId: {
    type: String,
  },
  serviceIds: {
    type: Array,
  },
  favoriteIds: {
    type: Array,
  },
});

module.exports = mongoose.model('users', users);
