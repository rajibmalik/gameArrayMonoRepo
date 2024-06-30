const User = require('../model/userModel');

const createUser = (steamId, username) => {
  const newUser = new User({
    steamID: steamId,
    username: username,
  });

  return newUser.save();
};

module.exports = {
  createUser,
};
