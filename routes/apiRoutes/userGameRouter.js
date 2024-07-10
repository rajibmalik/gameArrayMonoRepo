const express = require('express');
const router = express.Router();
const userGameController = require('../../controllers/apiControllers/userGameController');

router.route('/').get(userGameController.getAllUserGames);

router
  .route('/:steamid')
  .get(userGameController.getAllUserGamesAndGamesForOneUser);

router
  .route('/:steamid/:searchtext')
  .get(userGameController.getAllUserGamesForOneUserAndSearch);

router
  .route('/top10-by-playtime/:steamid')
  .get(userGameController.getTop10PlayedGames);

router
  //:genres is the number of genres
  .route('/top-genres-by-playtime/:steamid/:genres')
  .get(userGameController.getTopPlayedGenres);

module.exports = router;
