const Game = require('../../model/gameModel');

exports.getAllGames = async () => {
  try {
    const allGames = await Game.find();

    return allGames;
  } catch (err) {
    console.log('Error getAllGames');
    throw err;
  }
};

exports.findGameByAppID = async (appid) => {
  try {
    const game = await Game.findOne({ appid });
    return game;
  } catch (err) {
    console.log('Error finding game by appid' + err.message);
  }
};
