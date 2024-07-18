const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  steamID: {
    type: String,
    required: [true, 'A user must have a steamID'],
    unique: [true, 'A user must have a unique ID'],
    trim: true,
  },
  username: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
