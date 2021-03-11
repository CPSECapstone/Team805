require('dotenv').config();
const express = require('express');
const router = new express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

// Mongoose models
const usersModel = require('../models/users');
let refreshTokens = []; // should use a mongoose model in the future

router.use(cookieParser());
// duration of access/refresh cookies in seconds
const accessTime = 60;
const refreshTime = 3600;

/**
 * @param {Object} payload with user data
 * @return {Object} jwt access token
 */
function generateAccessToken(payload) {
  return jwt.sign(
      payload,
      process.env.ACCESS_PRIV_KEY, {expiresIn: accessTime.toString() + 's'});
};

/**
 * @param {Object} payload with user data
 * @return {Object} jwt refresh token
 */
function generateRefreshToken(payload) {
  const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_PRIV_KEY,
      {expiresIn: refreshTime.toString() + 's'});
  refreshTokens.push(refreshToken);
  return refreshToken;
};

/**
 * @param {Object} user data
 * @return {Object} user id in mongodb
 */
function extractPayload(user) {
  return {
    _id: user._id,
  };
};

// Route to logout
router.delete('/logout', (req, res) => {
  refreshTokens =
    refreshTokens.filter((token) => token !== req.body.refreshToken);
  res.sendStatus(204);
});

// Route to login ~ recieve accessToken, refreshToken, and loggedIn cookie
router.post('/login', (req, res) => {
  usersModel.findOne({username: req.body.username})
      .then((user) => {
        if (!user) {
          return res.status(404).json({msg: 'could not find user'});
        }
        bcrypt.compare(req.body.password, user.password).then((match) => {
          if (match) {
            return res.status(200)
                .cookie(
                    'accessToken',
                    generateAccessToken(extractPayload(user)),
                    {
                      httpOnly: true,
                      secure: false,
                      expires: new Date(Date.now() + accessTime * 1000),
                    })
                .cookie(
                    'refreshToken',
                    generateRefreshToken(extractPayload(user)),
                    {
                      httpOnly: true,
                      secure: false,
                      expires: new Date(Date.now() + refreshTime * 1000),
                      path: '/token',
                    })
                .json({message: 'logged in successfully'});
          } else {
            return res.status(404).json({message: 'Wrong password'});
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
});

// Route to refresh accessTokens
router.post('/token', (req, res) => {
  let refreshToken = null;
  if (req && req.cookies) {
    refreshToken = req.cookies.refreshToken;
  }
  if (refreshToken == null) {
    return res.status(403).json({message: 'No refreshToken provided!'});
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({message: 'Invalid refreshToken'});
  }
  if (refreshToken.exp*1000 <= new Date()) {
    return res.status(403).json({message: 'refreshToken expired'});
  }
  jwt.verify(refreshToken, process.env.REFRESH_PRIV_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    res.status(200).cookie(
        'accessToken',
        generateAccessToken(extractPayload(user)),
        {
          httpOnly: true,
          secure: false,
        })
        .json({message: 'refreshed successfully'});
  });
});

module.exports = router;
