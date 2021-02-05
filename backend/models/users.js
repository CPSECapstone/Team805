const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userServices = new Schema({
  name: {
    type: String,
  },
  isFavorite: {
    type: Boolean,
  },
});

const users = new Schema({
  userId: {
    type: String,
  },
  subscribedServices: {
    type: [userServices],
  },
});

module.exports = mongoose.model('users', users);
