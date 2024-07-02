const express = require('express');
const userController = require('../controllers/userController');
const gamesController = require('../controllers/gamesController');

// This is a Router responsible for the routes associated with the account
// userController and gamesController handle the logif for these routes

const router = express.Router();

// Middleware to ensure user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

// Middleware chained before redirection to account page
router.get(
  '/',
  ensureAuthenticated, // Protects routes, ensuring authentication
  userController.createUser, // Creates user if new
  gamesController.fetchOwnedGames, // Fetches owned & updates owned games to database
  gamesController.createUserGames,
  gamesController.queryGames, // Queries new games for information
  gamesController.createGamesInDatabase,
  userController.redirectToAccount, // Redirects to account page
);

module.exports = router;
