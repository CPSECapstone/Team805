const express = require('express');
const cors = require('cors');
const passport = require('passport');
const initializePassport = require('./passport-local-config');
const session = require('express-session');
const bodyParser = require('body-parser');

// Middleware
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // react app
  credentials: true,
}));

app.use(session({
  // temp secret, will be changed and moved to env file
  secret: 'Test',
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
    password: 'password!',
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

app.post('/login',
    passport.authenticate('local'),
    (req, res) => {
      console.log(req.body);
      res.redirect('/');
    },
);

app.listen(3001, () => console.log('Login API on port 3001'));
