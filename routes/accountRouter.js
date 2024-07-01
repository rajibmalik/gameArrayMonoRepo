const express = require('express');
const userController = require('../controllers/userController');
const gamesController = require('../controllers/gamesController');

const router = express.Router();

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

// Middleware chained before redirection to account page
// 1) If a new user, a User model is created in the database
// 2) If there are new games:
//      - Adds new games to the database
//      - Adds new userGames to the database
router.get(
  '/',
  userController.createUser,
  gamesController.fetchOwnedGames,
  userController.redirectToAccount,
);

module.exports = router;
