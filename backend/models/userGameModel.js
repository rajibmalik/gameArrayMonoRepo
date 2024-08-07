const mongoose = require('mongoose');

const userGameSchema = new mongoose.Schema({
  appid: {
    type: String,
    ref: 'Game',
    required: [true, 'A userGame must have an appid'],
  },
  steamid: {
    type: String,
    ref: 'User',
    required: [true, 'A userGame must have a steamid'],
  },
  playtime: {
    type: Number,
    default: 0,
  },
  acquiredAchievements: {
    type: Number,
    trim: true,
  },
});

const UserGame = mongoose.model('UserGame', userGameSchema);

module.exports = UserGame;
