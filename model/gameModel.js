const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameID: {
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
  image: {
    type: String,
    trim: true,
  },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
