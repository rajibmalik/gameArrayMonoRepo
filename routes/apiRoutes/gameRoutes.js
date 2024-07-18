const express = require('express');
const router = express.Router();
const gameController = require('../../controllers/apiControllers/gameController');

router.route('/').get(gameController.getGames);

router.route('/:appid').get(gameController.getGame);

module.exports = router;
