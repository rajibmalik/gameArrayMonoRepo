const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  appID: {
    type: String,
    required: [true, 'A game must have a name'],
    unique: [true, 'A game must have a unique ID'],
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'A game must have a name'],
    trim: true,
  },
  headerImage: {
    type: String,
    trim: true,
  },
  genres: {
    type: [String],
    default: [],
    trim: true,
  },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
