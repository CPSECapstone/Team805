const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const initializePassport = require('./passport-jwt-config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Mongoose models
const usersModel = require('./models/users');
const servicesModel = require('./models/services');

// Database connection (ensure env variables are set for username/password)
const db = 'mongodb+srv://' + process.env.dbuser + ':' + process.env.dbpass + '@cloudhaven.92yac.mongodb.net/CloudHaven?retryWrites=true&w=majority';
mongoose.set('useFindAndModify', false);
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // react app
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
initializePassport(passport);
app.use(passport.initialize());

app.post('/register', async (req, res) => {
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

// Route for getting user subscribed services
app.get('/users/services', 
  passport.authenticate('jwt', {session: false}), function(req, res) {
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
app.post('/users/services',
  passport.authenticate('jwt', {session: false}), function(req, res) {
    usersModel.findOneAndUpdate({_id: req.user._id},
      {$push: {serviceIds: req.body.serviceId}}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      })
});

// Route for removing a subscribed service from a specific user
app.delete('/users/services',
  passport.authenticate('jwt', {session: false}), function(req, res) {
    usersModel.findOneAndUpdate({_id: req.user._id},
        {$pull: {serviceIds: req.body.serviceId}}, function(err, result) {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        })
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

app.listen(3001, () => console.log('API on port 3001'));