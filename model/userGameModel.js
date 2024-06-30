const mongoose = require('mongoose');

const userGameSchema = new mongoose.Schema({
  gameID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  steamID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  playtime: {
    type: Number,
    default: 0,
  },
  achievements: {
    totalAchievements: Number,
    acquiredAchievements: Number,
  },
});

const UserGame = mongoose.model('UserGame', userGameSchema);

module.exports = UserGame;
