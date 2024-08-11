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
  favourite: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot exceed 5'],
    default: 0,
  },
});

const UserGame = mongoose.model('UserGame', userGameSchema);

module.exports = UserGame;
