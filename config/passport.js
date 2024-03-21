const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user');

// Configure Passport.js to use the LocalStrategy for username/password authentication
passport.use(new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'Password'
  },
  async (username, password, done) => {
    try {
      // Find the user with the provided username in the database
      const user = await UserModel.findByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect email!' });
      }
      // Check if the password is correct
      const isValidPassword = await user.isValidPassword(password);
      if (!isValidPassword) {
        return done(null, false, { message: 'Incorrect password!'})
      }
      // Authentication Successful
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Serialize and deserialize user methods for session management
passport.serializeUser(async (id, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;