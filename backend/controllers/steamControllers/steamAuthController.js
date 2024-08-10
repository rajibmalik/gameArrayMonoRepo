const passport = require('../../config/passportConfig');
const { getIsProfileVisibile } = require('../../services/steamService');

// This is a controller class for the steamAuthRoutes, it contains
// relevant middleware for Steam authentication

const validateAccount = async (req, res) => {
  try {
    const success = await getIsProfileVisibile(req.user.steamID);

    if (success) {
      res.redirect('/account');
    } else {
      res.status(403).json({
        message:
          'Unable to access account, as your Steam profile is private. ' +
          'To gain access, please make your profile public by following these steps:\n' +
          '1) Log in to Steam and click on your username.\n' +
          '2) Go to "Privacy Settings".\n' +
          '3) Set "My profile" to "Public".\n' +
          '4) Return to GameArray and try logging in again.',
      });
    }
  } catch (err) {
    res.status(500).json({
      message:
        'There was an error trying to access the users Steam account ' +
        err.message,
    });
  }
};

// Middleware initiating authentication with Steam using Passport config
const initiateSteamAuth = passport.authenticate('steam');

// Middleware handling Steam authentication callback
// Upon successful authentication, redirects to '/account' page
const steamAuthCallback = (req, res) => {
  passport.authenticate('steam', { failureRedirect: '/' })(req, res, () => {
    if (req.user) {
      console.log(`Steam Authentication successful:`);
      console.log(`Username: ${req.user.username}`);
      console.log(`Steam ID: ${req.user.steamID}`);
    }

    // Redirect to the account route to initialise Steam API queries

    res.redirect('/auth/steam/validate-account');
  });
};

module.exports = {
  initiateSteamAuth,
  steamAuthCallback,
  validateAccount,
};
