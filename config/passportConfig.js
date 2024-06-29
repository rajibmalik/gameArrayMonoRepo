const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
require('dotenv').config();

passport.use(
  new SteamStrategy(
    {
      returnURL: 'http://localhost:3000/auth/steam/callback',
      realm: 'http://localhost:3000/',
      apiKey: process.env.STEAM_API_KEY,
    },
    (identifier, profile, done) => {
      console.log('Steam profile:', profile);

      const user = {
        id: profile.id,
        displayName: profile.displayName,
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
