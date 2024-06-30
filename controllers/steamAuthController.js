const passport = require('../config/passportConfig');

// Logic to authenticate with steam
exports.initiateSteamAuth = passport.authenticate('steam');

// Logic to handle steam authentictaion callback
exports.steamAuthCallback = (req, res) => {
  passport.authenticate('steam', { failureRedirect: '/' })(req, res, () => {
    console.log('Authentication successful');
    res.redirect('/account');
  });
};
