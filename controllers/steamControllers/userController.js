const userService = require('../../services/dbServices/userService');
const User = require('../../models/userModel');

// This is a controller that is associated with User model creation

// Creates a User model if the user is new, using session data
exports.createUser = async (req, res, next) => {
  try {
    const userInfo = req.user;
    let user = await User.findOne({ steamID: userInfo.steamID });

    if (!user) {
      User.create(req.user);
    }

    next();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message,
    });
  }
};

// Renders account page with associated user data
exports.redirectToAccount = (req, res) => {
  res.redirect('http://localhost:5173/library');
};
