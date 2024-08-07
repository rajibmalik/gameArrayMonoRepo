const express = require('express');
const steamAuthController = require('../controllers/steamControllers/steamAuthController');

// This is a Router which is responsible for the routes associated with Steam authentication
// The steamAuthController handles the logic for these routes

const router = express.Router();

// Route to initiate authentication with Passport
router.get('/', steamAuthController.initiateSteamAuth);

// Route to handle the callback after Steam authentication
router.get('/callback', steamAuthController.steamAuthCallback);

module.exports = router;
