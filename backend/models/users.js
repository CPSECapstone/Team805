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
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('users', users);
