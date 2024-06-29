const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const session = require('express-session');
const passport = require('./config/passportConfig');
const SteamStrategy = require('passport-steam').Strategy;

const steamAuthRouter = require('./routes/steamAuthRoutes');

// Set up view engine
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

// Ensure authentication middleware
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Home route
app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

// Use the Steam auth router
app.use('/auth/steam', steamAuthRouter);

// Route for the account page
app.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account', { user: req.user });
});

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}!`);
});

module.exports = app;
