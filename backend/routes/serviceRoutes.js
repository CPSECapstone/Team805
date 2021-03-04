const express = require('express');
const router = new express.Router();

// Related mongoose models
const servicesModel = require('../models/services');

// Route for getting all available services
router.get('/services', function(req, res) {
  servicesModel.find({}, function(err, services) {
    if (err) {
      res.send(err);
    } else {
      res.send(services);
    }
  });
});

module.exports = router;
