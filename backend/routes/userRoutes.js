const express = require('express');
const router = new express.Router();

// Related mongoose models
const usersModel = require('../models/users');
const servicesModel = require('../models/services');

// Route for getting json containing all relevant user data
router.get('/users/:userId', function(req, res) {
  usersModel.findOne({userId: req.params.userId}, function(err, userData) {
    if (err || userData === null) {
      res.send('No user found with userId: ' + req.params.userId);
    } else {
      const relevantData = {
        email: userData.email,
        username: userData.username,
      };
      res.send(relevantData);
    }
  });
});

// Route for getting username
router.get('/users/:userId/username', function(req, res) {
  usersModel.findOne({userId: req.params.userId}, function(err, userData) {
    if (err || userData === null) {
      res.send('No user found with userId: ' + req.params.userId);
    } else {
      res.send(userData.username);
    }
  });
});

// Route for getting user email
router.get('/users/:userId/email', function(req, res) {
  usersModel.findOne({userId: req.params.userId}, function(err, userData) {
    if (err || userData === null) {
      res.send('No user found with userId: ' + req.params.userId);
    } else {
      res.send(userData.email);
    }
  });
});

// Route for getting user subscribed services
router.get('/users/:userId/services', function(req, res) {
  usersModel.findOne({userId: req.params.userId}, function(err, userData) {
    if (err || userData === null) {
      res.send('No user found with userId: ' + req.params.userId);
    } else {
      servicesModel.find({serviceId: {$in: userData.serviceIds}},
          function(err, services) {
            if (err) {
              res.send(err);
            } else {
              const servicesWithFavorites = services.map((serviceDoc) => {
                const serviceObj = serviceDoc.toObject();
                serviceObj.isFavorite =
                    userData.favoriteIds.includes(serviceDoc.serviceId);
                return serviceObj;
              });
              res.send(servicesWithFavorites);
            }
          });
    }
  });
});

// Route for adding a subscribed service to a specific user
router.post('/users/:userId/services', function(req, res) {
  usersModel.findOneAndUpdate({userId: req.params.userId},
      {$push: {serviceIds: req.body.serviceId}}, function(err, userData) {
        if (err || userData === null) {
          res.send('No user found with userId: ' + req.params.userId);
        } else {
          res.send(userData);
        }
      });
});

// Route for removing a subscribed service from a specific user
router.delete('/users/:userId/services', function(req, res) {
  usersModel.findOneAndUpdate({userId: req.params.userId},
      {$pull: {serviceIds: req.body.serviceId}}, function(err, userData) {
        if (err || userData === null) {
          res.send('No user found with userId: ' + req.params.userId);
        } else {
          res.send(userData);
        }
      });
});

module.exports = router;
