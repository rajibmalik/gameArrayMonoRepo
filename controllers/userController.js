const userService = require('../services/userService');
const User = require('../model/userModel');

exports.createUser = async (req, res) => {
  try {
    console.log('CREATE USER');
    req.user.steamID, req.user.username;
    const newUser = await User.create(req.user.steamID, req.user.username);

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
