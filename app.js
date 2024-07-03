const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./config/passportConfig');

// Routers
const steamAuthRouter = require('./routes/steamAuthRoutes');
const accountRouter = require('./routes/accountRouter');

const app = express();

// Uses Mongoose to connect to the MongoDB database
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

// Middleware for parsing JSON
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

// Routes redirected to steamAuthRouter
app.use('/auth/steam', steamAuthRouter);

// Routes redirected to accounRouter
app.use('/account', accountRouter);

// Initiates server
app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}!`);
});

module.exports = app;
