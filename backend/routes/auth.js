const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

module.exports = (app, passport) => {
  app.use('/auth', router);

  // Registration Endpoint
  router.post('/register', async (req, res, next) =>{
    try {
      const data = req.body;
      const response = await UserModelInstance.registerUser(data)
      res.status(200).send(response);
    } catch(err) {
      next(err);
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
}