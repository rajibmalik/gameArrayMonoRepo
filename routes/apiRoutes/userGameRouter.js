const express = require('express');
const router = express.Router();
const userGameController = require('../../controllers/apiControllers/userGameController');

router.route('/').get(userGameController.getAllUserGames);

router
  .route('/:steamid')
  .get(userGameController.getAllUserGamesAndGamesForOneUser);

router
  .route('/top10-by-playtime/:steamid')
  .get(userGameController.getTop10PlayedGames);

// router
//   .route('/top6-genres-by-playtime/:steamid')
//   .get(userGameController.getTop6PlayedGenres);

module.exports = router;
