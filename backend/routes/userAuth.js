//userAuth.js routes
const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

// POST /api/login - rute for user login
// This will authenticate the username and password
router.post('/login', passport.authenticate('local', {
  successRedirect: '/succeslogin',
  failureRedirect: '/login'
}));

//This rute is used to show that the POST request for login worked!
router.get('/succeslogin', (req, res) => {
  res.json({ message: 'You succesfull logged ind! :D' });
});

module.exports = router;