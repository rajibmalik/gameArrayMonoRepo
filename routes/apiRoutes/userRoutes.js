const express = require('express');

const User = require('../../model/userModel');

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users: users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
});

module.exports = router;
