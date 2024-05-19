//Passport.js config
const passport = require('passport');
const LocalStrategy = require('passport-local');
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

const initialize = (passport) => {
  const authenticateUser = async (username, password, done) => {
    try {
      const user = await UserModelInstance.findByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
      }

      const isValidPassword = await UserModelInstance.isValidPassword(password, user.Password);
      if (isValidPassword) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect username or password' });
      }
    } catch (error) {
      return done(error);
    }
  };
  // configures Passport to use the "local" strategy. which means using authentication with the use of Username/Email and -
  // password
  passport.use(new LocalStrategy(authenticateUser));
  // Serialize and deserialize user methods for session management
  // serializeUser is called when a user is authenticated. It takes a user object and a callback (done).
  passport.serializeUser((user, done) => done(null, user.id));
  // deserializeUser is called whenever a user makes a request and their session is being retrieved. It deserializes the user from the session.
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModelInstance.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}



module.exports = initialize;