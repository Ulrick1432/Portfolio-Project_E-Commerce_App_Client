const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const passport = require('passport');
const UserModelInstance = new UserModel();

// POST /api/login - rute for user login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/succeslogin'
}));

router.get('/succeslogin', (req, res) => {
  res.json({ message: 'You succesfull logged ind! :D' });
});

module.exports = router;