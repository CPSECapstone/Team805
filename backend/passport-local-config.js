const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

/**
 *
 * @param {*} passport the passport object used for auth.
 */
function initialize(passport, getUserByUsername) {
  const authenticateUser = async (username, password, done) => {
    const user = getUserByUsername(username);
    if (user == null) {
      console.log('couldn\'t find user');
      return done(null, false, {message: 'Not an existing username'});
    }

    try {
      if (password === user.password) {
        // if (await bcrypt.compare(password, user.password)) {
        console.log('pwd match');
        return done(null, user, {message: 'right password'});
      } else {
        console.log('pwd does not match');
        return done(null, false, {message: 'Wrong password'});
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy(authenticateUser));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};

module.exports = initialize;
