const express = require('express');
const passport = require('passport');

const router = express.Router();

// Route to initiate Steam authentication
router.get('/', passport.authenticate('steam'));

// Route to handle the callback after Steam authentication
router.get(
  '/callback',
  passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Authentication successful');
    res.redirect('/account');
  },
);

module.exports = router;
