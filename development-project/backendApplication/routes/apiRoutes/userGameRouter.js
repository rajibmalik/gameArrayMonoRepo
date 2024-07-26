const express = require('express');
const router = express.Router();
const userGameController = require('../../controllers/apiControllers/userGameController');
const validator = require('../../utils/validatorMiddleware');

router
  //:genres is the number of genres to be retrieved
  // Gets the top played genres for a user
  .route('/top-genres-by-playtime/:steamid/:genres')
  .get(validator.steamid, userGameController.getTopPlayedGenres);

router
  // Gets total playtime for user
  .route('/total-playtime/:steamid')
  .get(validator.steamid, userGameController.getTotalPlaytime);

// This endpoint takes two optional query parameters:
// 1) searchtext - a string representing the name of game
// 2) genre - a string representing the genre of a game
router
  .route('/:steamid')
  .get(validator.steamid, userGameController.getFilteredGames);

// router
//   .route('/:steamid')
//   // Gets userGames with Game information for a user
//   .get(validator.steamid, userGameController.getAllUserGames);

router
  // Gets the top 10 userGames by playtime for a user
  .route('/top-10-by-playtime/:steamid')
  .get(validator.steamid, userGameController.getTop10PlayedGames);

router.route('/').get(userGameController.getAllUserGames);
module.exports = router;
