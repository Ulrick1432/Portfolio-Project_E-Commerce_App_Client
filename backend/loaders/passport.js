const passport = require('passport');
const LocalStrategy = require('passport-local');
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

module.exports = (app) => {

  // Initialize passport
  app.use(passport.initialize());  
  app.use(passport.session());
  
  // Set method to serialize data to store in cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  

  // Set method to deserialize data stored in cookie and attach to req.user
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModelInstance.getUserById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // Configure strategy to be use for local login
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await UserModelInstance.login(username, password);
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    }
  ));
  return passport;
}