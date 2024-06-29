const express = require('express');
const app = express();
const ejs = require('ejs');
const dotenv = require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// Session middleware config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

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

app.get('/auth/steam', passport.authenticate('steam'));

app.get(
  '/auth/steam/callback',
  passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => {
    console.log(res);
    res.redirect('/account');
  },
);

app.get('/dynamic-ejs', (req, res) => {
  const data = {
    message: 'Hello, dynamic EJ world!',
    date: new Date().toLocaleDateString(),
  };
  res.render('dynamic-template', { data });
});

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

app.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account', { user: req.user });
});

// app.get('/account', ensureAuthenticated (req, res) => {
//     res.render
// })

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}!`);
});

module.exports = app;
