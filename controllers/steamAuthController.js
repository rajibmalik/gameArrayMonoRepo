const passport = require('../config/passportConfig');
const userService = require('../services/userService');
const userController = require('../controllers/userController');

// Logic to authenticate with steam
const initiateSteamAuth = passport.authenticate('steam');

// Logic to handle steam authentictaion callback
const steamAuthCallback = (req, res) => {
  passport.authenticate('steam', { failureRedirect: '/' })(req, res, () => {
    console.log('Steam Authentication successful');

    res.redirect('/account');
  });
};

module.exports = {
  initiateSteamAuth,
  steamAuthCallback,
};
