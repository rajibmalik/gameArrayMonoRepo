const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./config/passportConfig');
const cors = require('cors');

// Routers
const steamAuthRouter = require('./routes/steamAuthRouter');
const accountRouter = require('./routes/accountRouter');
const userRouter = require('./routes/apiRoutes/userRoutes');
const gameRouter = require('./routes/apiRoutes/gameRoutes');
const userGameRouter = require('./routes/apiRoutes/userGameRouter');
const sessionRouter = require('./routes/sessionRouter');

const app = express();

// Uses Mongoose to connect to the MongoDB database
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => {
    console.log('MongoDB connection was successful!');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err.message);
  });

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// Enable CORS, required to interact with the frontend application
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // URL of live React app, could change!
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent for session
  }),
);

// Session middleware config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // The length of the session once a user authenticates
    cookie: {
      maxAge: 1 * 60 * 60 * 24 * 1000,
    },
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

// Routes redirect to sessionRouter
app.use('/api/v1/session', sessionRouter);

// Routes redirected to API Routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/games', gameRouter);
app.use('/api/v1/usergames', userGameRouter);

// Initiates server
app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}!`);
});

module.exports = app;
