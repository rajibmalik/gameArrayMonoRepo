const express = require('express');
const steamAuthController = require('../controllers/steamAuthController');
const userController = require('../controllers/userController');

const router = express.Router();

// Route to initiate Steam authentication
router.get('/', steamAuthController.initiateSteamAuth);

// Route to handle the callback after Steam authentication
router.get('/callback', steamAuthController.steamAuthCallback);

module.exports = router;
