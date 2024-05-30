const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

module.exports = (app, passport) => {
  app.use('/auth', router);

  // Registration Endpoint
  router.post('/register', async (req, res, next) => {
    try {
      const data = req.body;
      const response = await UserModelInstance.registerUser(data);
      res.status(200).send(response);
    } catch (err) {
      console.error('Error during user registration:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

    // Login Endpoint
  router.post('/login', passport.authenticate('local', {
    successRedirect: 'login/success',
    failureRedirect: '/login/failed'
  }));


  // Check Login status Endpoint
  router.get('/login/success', (req, res, next) => {
    try {
      if(req.user) {
        return res.status(200).json({
          success: true,
          message: 'login successfull',
          user: req.user
        });
      }
      return res.status(401).send({
        success: false,
        message: 'No user is logged in'
      });
    } catch(err) {
      next(err);
    }
  });

  // Check Login status Endpoint
  router.get('/login/failed', (req, res, next) => {
    try {
        res.status(401).send({
          success: false,
          message: 'No user is logged in'
        });
    } catch(err) {
      next(err);
    }
  });

  router.post('/logout', (req, res, next) => {
    req.logout(function(err) {
      if (err) {
        console.error('Error during logout:', err);
        return next(err);
      }
  
      // Destroy the session
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return next(err);
        }
  
        // Clear the cookie
        res.clearCookie('UPH first session'); // Ensure this matches the session cookie name
  
        // Send success response
        res.status(200).json({
          success: true,
          message: 'Logged out successfully'
        });
      });
    });
  });
  
}