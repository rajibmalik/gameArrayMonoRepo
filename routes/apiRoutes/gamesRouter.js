const express = require('express');
const router = express.Router();
const gameController = require('../../controllers/apiControllers/gameController');

router.route('/').get(gameController.getGames);

// router.route('/:steamID').get(userController.getUser);

module.exports = router;
