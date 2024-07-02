const Game = require('../../model/gameModel');

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
    for (const game of games) {
      console.log(`GAME ID: ${game.appID}`);
      let existingGame = await Game.findOne({ appID: game.appID });
      console.log(`EXISTING GAME ${existingGame}`);

      if (existingGame === null) {
        // Takes each object and maps it to the Game schema, ignoring any information not related to schema
        await Game.create(game);
        console.log(`Successfully created: ${game.appID} ${game.name}`);
      } else {
        console.log(
          `Game not created as it already exists: ${game.appID} ${game.name}`,
        );
      }

      existingGame = null;
    }
  } catch (err) {
    console.log('Error creating games' + err.message);
    throw err;
  }
};
