const Game = require('../../models/gameModel');

// Fetches all of the games from the database
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

// Takes an array of game objects and creates them in the database if they are new
exports.createGames = async (games) => {
  try {
    console.log(`CREATING GAMES ${games}`);

    for (const game of games) {
      console.log(`GAME ID: ${game.appid}`);
      let existingGame = await Game.findOne({ appid: game.appid });
      console.log(`EXISTING GAME ${existingGame}`);

      if (existingGame === null) {
        // Takes each object and maps it to the Game schema, ignoring any information not related to schema
        await Game.create(game);
        console.log(`Successfully created: ${game.appid} ${game.name}`);
      } else {
        console.log(
          `Game not created as it already exists: ${game.appid} ${game.name}`,
        );
      }

      existingGame = null;
    }
  } catch (err) {
    console.log('Error creating games' + err.message);
    throw err;
  }
};
