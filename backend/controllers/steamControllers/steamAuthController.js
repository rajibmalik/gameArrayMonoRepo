const passport = require('../../config/passportConfig');

// This is a controller class for the steamAuthRoutes, it contains
// relevant middleware for Steam authentication

// Middleware initiating authentication with Steam using Passport config
const initiateSteamAuth = passport.authenticate('steam');

// Middleware handling Steam authentication callback
// Upon successful authentication, redirects to '/account' page
const steamAuthCallback = (req, res) => {
  passport.authenticate('steam', { failureRedirect: '/' })(req, res, () => {
    console.log('Steam Authentication successful');

    // Redirect to the account route to initialise Steam API queries
    res.redirect('/account');
  });
};

module.exports = {
  initiateSteamAuth,
  steamAuthCallback,
};
