const userService = require('../../services/dbServices/userService');
const User = require('../../model/userModel');

// This is a controller that is associated with User model creation

// Creates a User model if the user is new, using session data
exports.createUser = async (req, res, next) => {
  try {
    console.log('CREATE USER');

    const userInfo = req.user;
    let user = await User.findOne({ steamID: userInfo.steamID });

    if (!user) {
      User.create(req.user);
    }

    next();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: console.log(err),
    });
  }
};

// Renders account page with associated user data
exports.redirectToAccount = (req, res) => {
  res.redirect('http://localhost:5173/library');
};
