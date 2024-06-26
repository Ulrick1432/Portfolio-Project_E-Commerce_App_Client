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
    console.log('This is the user.googleId in serializeUser → ' + user.googleId);
    console.log('This is the user in serializeUser → ' + user.id);
    done(null, user.id);
  });
  
  // Set method to deserialize data stored in cookie and attach to req.user
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // Configuration strategy to be used for google login
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
    }, 
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await UserModelInstance.googleIdFindOrCreateAcc(profile);
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  ));

  // Configuration strategy to be used for local login
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
};