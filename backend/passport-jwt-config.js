require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const usersModel = require('./models/users');

const cookieExtractor = req => {
  let accessToken = null;
  if (req && req.cookies) {
    accessToken = req.cookies.accessToken;
  }
  return accessToken;
}

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.ACCESS_PRIV_KEY,
};

const initialize = (passport) => {
  const authenticateToken = (payload, done) => {
    if (payload.exp*1000 <= new Date()) 
      return done('Expired access token', false);

    usersModel.findById(payload._id)
      .then((user) => {
        if (user)
          return done(null, user);
        else
          return done('Not a registerd user', false);
      })
      .catch(err => done(null, err))
  };
  passport.use(new JwtStrategy(options, authenticateToken));
};

module.exports = initialize;