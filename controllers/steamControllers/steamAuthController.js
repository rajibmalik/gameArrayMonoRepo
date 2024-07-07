const passport = require('../../config/passportConfig');
const userService = require('../../services/dbServices/userService');
const userController = require('../steamControllers/userController');

// This is a controller class for the steamAuthRoutes, it contains
// relevant middleware for Steam authentication

// Middleware initiating authentication with Steam using Passport config
const initiateSteamAuth = passport.authenticate('steam');

// Middleware handling Steam authentication callback
// Upon successful authentication, redirects to '/account' page
const steamAuthCallback = (req, res) => {
  passport.authenticate('steam', { failureRedirect: '/' })(req, res, () => {
    console.log('Steam Authentication successful');

    // The route in the frontend application that the user should be redirected to upon successful authentication
    res.redirect('http://localhost:5174/library');
  });
};

module.exports = {
  initiateSteamAuth,
  steamAuthCallback,
};
