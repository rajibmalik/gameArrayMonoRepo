const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
require('dotenv').config();

// upon authentication, handles what to process
const handleAuthentication = (identifier, profile, done) => {
  // User information is stored in session data that can later be accessed
  const user = {
    id: profile.id,
    displayName: profile.displayName,
  };

  return done(null, user);
};

// Uses the SteamStrategy for authentication
passport.use(
  // SteamStrategy passes identifier, profile and done to the callback function handleAuthentication
  new SteamStrategy(
    {
      returnURL: 'http://localhost:3000/auth/steam/callback',
      realm: 'http://localhost:3000/',
      apiKey: process.env.STEAM_API_KEY,
    },
    handleAuthentication,
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
