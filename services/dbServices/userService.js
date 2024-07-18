const User = require('../../models/userModel');

exports.createUser = async (steamID, username) => {
  try {
    console.log('CREATE USER');
    const newUser = new User({ steamID, username });
    await newUser.save();
    return newUser;
  } catch (err) {
    throw new Error('Failed to create user: ' + err.message);
  }
};
