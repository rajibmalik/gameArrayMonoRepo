const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
require('dotenv').config();
const userController = require('../controllers/userController');

// Uses the SteamStrategy for authentication
passport.use(
  // SteamStrategy passes identifier, profile and done to the callback function handleAuthentication
  new SteamStrategy(
    {
      returnURL: 'http://localhost:3000/auth/steam/callback',
      realm: 'http://localhost:3000/',
      apiKey: process.env.STEAM_API_KEY,
    },
    (identifier, profile, done) => {
      // User information is stored in session data that can later be accessed
      const user = {
        steamID: profile.id,
        username: profile.displayName,
      };

      return done(null, user);
    },
  ),
);

// Serialize user into the session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

module.exports = passport;
