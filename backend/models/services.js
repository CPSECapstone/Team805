const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const services = new Schema({
  serviceId: {
    type: String,
  },
  name: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = mongoose.model('services', services);
