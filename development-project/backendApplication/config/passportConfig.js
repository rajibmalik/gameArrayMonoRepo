const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
require('dotenv').config();

// This is the configuration for Passport, which uses the SteamStrategy.

// returnURL: where Steam redirects user after authentication
// realm: URL for valid authentication purposes
// apiKey: Steam API key, fetched using env

// identifier: id provided by steam
// profile: contains user information
// done: callback function, called upon completion of authentication
passport.use(
  // SteamStrategy passes identifier, profile and done to the anonymous callback function
  new SteamStrategy(
    {
      returnURL: 'http://localhost:3000/auth/steam/callback',
      // returnURL: 'http://localhost:5173/auth/steam',
      realm: 'http://localhost:3000/',
      apiKey: process.env.STEAM_API_KEY,
    },
    (identifier, profile, done) => {
      // Creates user object, this will be stored in session
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
