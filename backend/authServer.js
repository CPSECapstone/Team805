require('dotenv').config();

const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Mongoose models
const Users = require('./models/users');

// Database connection (ensure env variables are set for username/password)
const db = 'mongodb+srv://' + process.env.dbuser + ':' + process.env.dbpass + '@cloudhaven.92yac.mongodb.net/CloudHaven?retryWrites=true&w=majority';
mongoose.set('useFindAndModify', false);
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:3000', // react app
  credentials: true,
}));

let refreshTokens = [];

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_PRIV_KEY, {expiresIn: '30s'});
}

function generateRefreshToken(payload) {
  const refreshToken = jwt.sign(payload, process.env.REFRESH_PRIV_KEY);
  refreshTokens.push(refreshToken);
  return refreshToken;
}

function extractPayload(user) {
  return {
    _id: user._id,
  }
}

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.refreshToken);
  res.sendStatus(204);
})

app.post('/login',  (req, res) => {
  Users.findOne({username: req.body.username})
    .then((user) => {
      if (!user) {
        res.status(404).json({msg: "could not find user"});
      }
      bcrypt.compare(req.body.password, user.password).then(match =>
      {
        if (match)
        {
          return res.status(200)
          .cookie(
            'accessToken', 
            generateAccessToken(extractPayload(user)),
            {
              httpOnly: true,
              secure: false
            })
          .cookie(
            'refreshToken',
            generateRefreshToken(extractPayload(user)),
            {
              httpOnly: true,
              secure: false
            })
          .cookie(
            'loggedIn', 'yup',
            {
              httpOnly: false,
              secure: false
            }
          )
          .json({message: 'logged in successfully'});
        } else {
          return res.status(404).json({message: 'Wrong password'});
        }
      });
    })
    .catch((err) => {console.log(err)});
})

app.post('/token', (req, res) => {
  let refreshToken = null;
  if (req && req.cookies) {
    refreshToken = req.cookies.refreshToken;
  }
  if (refreshToken == null) return res.sendStatus(403);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_PRIV_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    res.status(200).cookie(
      'accessToken',
      generateAccessToken(extractPayload(user)),
      {
        httpOnly: true,
        secure: false
      })
      .json({message: 'refreshed successfully'});
  })
})

app.listen(3002, () => console.log('Auth on 3002'));