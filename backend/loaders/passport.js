const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

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