require('dotenv').config();
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

// Routes
app.use(require('./routes/userRoutes'));
app.use(require('./routes/serviceRoutes'));

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

app.listen(3001, () => console.log('Login API on port 3001'));
