const express = require('express');
const router = express.Router();
const userGameController = require('../../controllers/apiControllers/userGameController');

router
  //:genres is the number of genres
  .route('/top-genres-by-playtime/:steamid/:genres')
  .get(userGameController.getTopPlayedGenres);

router
  .route('/:steamid/:searchtext/:genre')
  .get(userGameController.getSearchedGamesAndGenre);

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

router.route('/').get(userGameController.getAllUserGames);
module.exports = router;
