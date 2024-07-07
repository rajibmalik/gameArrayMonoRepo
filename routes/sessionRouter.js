const express = require('express');

// This is a Router which is responsible for the routes associated with the user session

const router = express.Router();

// If user is authenticated, returns session data
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      isAuthenticated: true,
      user: req.user,
    });
  } else {
    res.status(401).json({
      isAuthenticated: false,
      message: 'User is not authenticated',
    });
  }
});

module.exports = router;
