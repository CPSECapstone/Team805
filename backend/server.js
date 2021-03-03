const express = require('express');
const cors = require('cors');
const passport = require('passport');
const initializePassport = require('./passport-local-config');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Mongoose models
const usersModel = require('./models/users');
const servicesModel = require('./models/services');

// Database connection (ensure env variables are set for username/password)
const dbuser = process.env.dbuser;
const dbpass = process.env.dbpass;
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://' + dbuser + ':' + dbpass + '@cloudhaven.92yac.mongodb.net/CloudHaven?retryWrites=true&w=majority', {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', function() {
  console.log('MongoDB connection was successful');
});

// Middleware
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // react app
  credentials: true,
}));

app.use(session({
  // temp secret, will be changed and moved to env file
  secret: 'foobar',
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const users = [
  {
    id: 1,
    name: 'John Smith',
    username: 'user1',
    password: '$2a$10$IadWSbtWCdNRxYdreQ6to.CxdvANnY/Pd7DSJ7lKgkDVI6ba2sBMy',
    // hashed pwd for 'password!' ^^^^^^
    email: 'email@gmail.com',
  },
];

const getUserByUsername = (username) => users.find(
    (user) => user.username === username);


initializePassport(
    passport,
    getUserByUsername,
);

app.use(passport.initialize());
app.use(passport.session());

app.post(
    '/login',
    async (req, res, next) => {
      passport.authenticate(
          'local',
          async (err, user, info) => {
            console.log(req.body);
            try {
              if (err || !user) {
                const error = new Error('An error occured');
                return next(error);
              }
            } catch (error) {
              return next(error);
            }
            console.log('sending login sucess');
            // change what gets sent here
            // if you want to send more info to client
            return res.json({status: 'success'});
          },
      )(req, res, next);
    },
);

// Route for getting user subscribed services
app.get('/users/:userId/services', function(req, res) {
  usersModel.find({userId: req.params.userId}, function(err, userData) {
    if (err) {
      res.send(err);
    } else {
      servicesModel.find({serviceId: {$in: userData[0].serviceIds}},
          function(err, services) {
            if (err) {
              res.send(err);
            } else {
              const servicesWithFavorites = services.map((serviceDoc) => {
                const serviceObj = serviceDoc.toObject();
                serviceObj.isFavorite =
                  userData[0].favoriteIds.includes(serviceDoc.serviceId);
                return serviceObj;
              });
              res.send(servicesWithFavorites);
            }
          });
    }
  });
});

// Route for getting all available services
app.get('/services', function(req, res) {
  servicesModel.find({}, function(err, services) {
    if (err) {
      res.send(err);
    } else {
      res.send(services);
    }
  });
});

// Route for adding a subscribed service to a specific user
app.post('/users/:userId/services', function(req, res) {
  usersModel.findOneAndUpdate({userId: req.params.userId},
      {$push: {serviceIds: req.body.serviceId}}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
});

// Route for removing a subscribed service from a specific user
app.delete('/users/:userId/services', function(req, res) {
  usersModel.findOneAndUpdate({userId: req.params.userId},
      {$pull: {serviceIds: req.body.serviceId}}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
});

// // Route for adding a subscribed service to user favorites
// app.post('/users/:userId/favorites', function(req, res) {
//   usersModel.findOneAndUpdate({userId: req.params.userId},
//       {$push: {favoriteIds: req.body.serviceId}}, function(err, result) {
//         if (err) {
//           console.log(err);
//         } else {
//           res.send(result);
//         }
//       });
// });

// // Route for removing a subscribed service from user favorites
// app.delete('/users/:userId/favorites', function(req, res) {
//   usersModel.findOneAndUpdate({userId: req.params.userId},
//       {$pull: {favoriteIds: req.body.serviceId}}, function(err, result) {
//         if (err) {
//           console.log(err);
//         } else {
//           res.send(result);
//         }
//       });
// });

app.listen(3001, () => console.log('Login API on port 3001'));
