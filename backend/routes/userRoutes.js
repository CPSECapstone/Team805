const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const initializePassport = require('../passport-jwt-config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

initializePassport(passport);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(cookieParser());
router.use(passport.initialize());

// Related mongoose models
const usersModel = require('../models/users');
const servicesModel = require('../models/services');

// Route for registering a new user
router.post('/users/register', async (req, res) => {
  usersModel.findOne({username: req.body.username}).then((user) => {
    if (user) {
      res.status(400).send('Username already exists');
    } else {
      const newUser = new usersModel({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.hash(newUser.password, 10, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
      });
    }
  });
})

// Route for getting json containing all relevant user data
router.get('/users/:userId/all', function(req, res) {
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
router.get('/users/services', 
  passport.authenticate('jwt', {session: false}),
  function(req, res) {
    servicesModel.find({serviceId: {$in: req.user.serviceIds}},
        function(err, services) {
          if (err) {
            res.send(err);
          } else {
            const servicesWithFavorites = services.map((serviceDoc) => {
              const serviceObj = serviceDoc.toObject();
              serviceObj.isFavorite =
                  req.user.favoriteIds.includes(serviceDoc.serviceId);
              return serviceObj;
            });
            res.send(servicesWithFavorites);
          }
        }
    );
  }
);

// Route for adding a subscribed service to a specific user
router.post('/users/services',
  passport.authenticate('jwt', {session: false}),
  function(req, res) {
  usersModel.findOneAndUpdate({_id: req.user._id},
      {$push: {serviceIds: req.body.serviceId}}, function(err, userData) {
        if (err || userData === null) {
          res.send('A datase error occured while adding service: ' + req.body.serviceId);
        } else {
          res.send(userData);
        }
      });
});

// Route for removing a subscribed service from a specific user
router.delete('/users/services', 
  passport.authenticate('jwt', {session: false}),
  function(req, res) {
  usersModel.findOneAndUpdate({_id: req.user._id},
      {$pull: {serviceIds: req.body.serviceId}}, function(err, userData) {
        if (err || userData === null) {
          res.send('A datase error occured while deleting service: ' + req.body.serviceId);
        } else {
          res.send(userData);
        }
      });
});

module.exports = router;
