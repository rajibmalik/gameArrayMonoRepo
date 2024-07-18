const express = require('express');
const router = express.Router();
const userGameController = require('../../controllers/apiControllers/userGameController');

router.route('/').get(userGameController.getAllUserGames);

router
  .route('/total-playtime/:steamid')
  .get(userGameController.getTotalPlaytime);

router
  .route('/:steamid')
  .get(userGameController.getAllUserGamesAndGamesForOneUser);

router
  .route('/top-10-by-playtime/:steamid')
  .get(userGameController.getTop10PlayedGames);

router
  .route('/:steamid/:searchtext')
  .get(userGameController.getSearchedGamesForOneUser);

router
  //:genres is the number of genres
  .route('/top-genres-by-playtime/:steamid/:genres')
  .get(userGameController.getTopPlayedGenres);

module.exports = router;
