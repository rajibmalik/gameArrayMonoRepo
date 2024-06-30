const userService = require('../services/userService');
const User = require('../model/userModel');

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

exports.redirectToAccount = (req, res) => {
  res.render('account', { user: req.user });
};
