const express = require('express');
const userController = require('../controllers/steamControllers/userController');
const gameController = require('../controllers/steamControllers/gameController');
const userGameController = require('../controllers/steamControllers/userGameController');

// This is a Router responsible for the routes associated with the account
// userController and gamesController handle the logic for these routes
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
  userController.createUser, // Creates User document in MongoDB
  gameController.fetchAndProcessGames, // Fetches owned games from Steam API & processes data
  gameController.queryGames, // Queries new games for information from Steam API
  gameController.queryUserAchievements, // Query game achievements
  gameController.createGames, // Create Game documents in MongoDB
  userGameController.createAndUpdateUserGames, // Creates UserGame documents in MongoDB
  userController.redirectToAccount, // Redirects to account page
);

module.exports = router;
