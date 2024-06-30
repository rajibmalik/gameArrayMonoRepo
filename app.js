const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const session = require('express-session');
const passport = require('./config/passportConfig');

const steamAuthRouter = require('./routes/steamAuthRoutes');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connection was successful!');
  });

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

// Passport authentication middleware
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

// Routes redirected to steamAuthRouter
app.use('/auth/steam', steamAuthRouter);

// Route for account page
app.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account', { user: req.user });
});

// Initiates server
app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}!`);
});

module.exports = app;
