const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('../config/passportConfig');
const cors = require('cors');

// Routers
const steamAuthRouter = require('../routes/steamAuthRouter');
const accountRouter = require('../routes/accountRouter');
const userRouter = require('../routes/apiRoutes/userRoutes');
const gameRouter = require('../routes/apiRoutes/gameRoutes');
const userGameRouter = require('../routes/apiRoutes/userGameRouter');
const sessionRouter = require('../routes/sessionRouter');

function createServer() {
  const app = express();

  app.set('trust proxy', 1); // Required to work with deployment platforms

  // Enable CORS
  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        process.env.VERCEL_URL,
        process.env.RENDER_URL,
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }),
  );

  // Session middleware config
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1 * 60 * 60 * 24 * 1000,
      },
    }),
  );

  // Initialize Passport and session
  app.use(passport.initialize());
  app.use(passport.session());

  // Middleware for parsing JSON
  app.use(express.json());

  // Routes
  app.use('/auth/steam', steamAuthRouter);
  app.use('/account', accountRouter);
  app.use('/api/v1/session', sessionRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/games', gameRouter);
  app.use('/api/v1/usergames', userGameRouter);

  // Handles unhandled routes
  app.all('*', (req, res, next) => {
    res.status(404).json({
      status: 'fail',
      message: `Can not find ${req.originalUrl} on this server`,
    });
  });

  return app;
}

module.exports = createServer;
