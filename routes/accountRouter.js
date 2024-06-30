const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

// Route to initiate Steam authentication
router.get('/', userController.createUser, userController.redirectToAccount);

module.exports = router;
