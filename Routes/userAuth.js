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

// Tests that findByUsername function works
router.get('/testFindByUsername', async (req, res) => {
  try {
    const thisIsUsername = await UserModelInstance.findByUsername("Sonny1432");
    res.json(thisIsUsername);
  } catch(err) {
    throw new Error('cant find username: ' + err.message);
  }
})
// tests that isValidPassword works
router.get('/testisValidPassword', async (req, res) => {
  try {
    const thisIsPassword = await UserModelInstance.isValidPassword("TestMyPassword97");
    res.json(thisIsPassword);
  } catch(err) {
    throw new Error('Cant find password: ' + err.message);
  }
})

module.exports = router;