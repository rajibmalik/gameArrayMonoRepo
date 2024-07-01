const steamService = require('../services/steamService');
const gameService = require('../services/dbServices/gameService');

// This is a controller class for the accountRouter
// it contains relevant middleware for associated with Game models

// Using the steamService, this obtains the games owned by the user
exports.fetchOwnedGames = async (req, res, next) => {
  try {
    const steamID = req.user.steamID;
    const ownedGames = await steamService.getOwnedGames(steamID);
    const appids = this.findNewGames(ownedGames);

    next();
  } catch (err) {
    console.log('Error fetching owned games:' + err);
    res.status(500).json({
      message: 'Failed to fetch owned games',
      error: err.message,
    });
  }
};

// A utility function that takes the games owned by the user and
// checks for new games that do not exist in the database
exports.findNewGames = async (ownedGames) => {
  try {
    // 1) Obtain appids array from ownedGames object
    const appids = ownedGames.map((game) => game.appid);

    // 2) Query MongoDB to find existing games
    const allDatabaseGames = await gameService.getAllGames();
    const allDatabaseGamesIds = allDatabaseGames.map((game) => game.gameID);

    // 3 Filter out new appids that are not in the database
    const newGamesIds = appids.filter(
      (game) => !allDatabaseGamesIds.includes(game.toString()),
    );

    console.log(`new games: ${newGamesIds}`);

    return newGamesIds;
  } catch (err) {
    console.log(err);
  }
};
