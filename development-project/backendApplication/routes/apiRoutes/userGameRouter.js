const express = require('express');
const router = express.Router();
const userGameController = require('../../controllers/apiControllers/userGameController');
const validator = require('../../utils/validatorMiddleware');

router
  //:genres is the number of genres
  .route('/top-genres-by-playtime/:steamid/:genres')
  .get(validator.steamid, userGameController.getTopPlayedGenres);

router
  .route('/:steamid/:searchtext/:genre')
  .get(userGameController.getSearchedGamesAndGenre);

router
  .route('/total-playtime/:steamid')
  .get(validator.steamid, userGameController.getTotalPlaytime);

router
  .route('/:steamid')
  .get(validator.steamid, userGameController.getAllUserGamesAndGamesForOneUser);

router
  .route('/top-10-by-playtime/:steamid')
  .get(validator.steamid, userGameController.getTop10PlayedGames);

router
  .route('/:steamid/:searchtext')
  .get(validator.steamid, userGameController.getSearchedGamesForOneUser);

router.route('/').get(userGameController.getAllUserGames);
module.exports = router;
