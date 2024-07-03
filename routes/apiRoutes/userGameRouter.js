const express = require('express');
const router = express.Router();
const userGameController = require('../../controllers/apiControllers/userGameController');

router.route('/').get(userGameController.getAllUserGames);

router.route('/:steamid').get(userGameController.getAllUserGamesForOneUser);

module.exports = router;
