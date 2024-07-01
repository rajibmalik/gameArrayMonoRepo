const steamService = require('../services/steamService');
const gameService = require('../services/dbServices/gameService');

exports.fetchOwnedGames = async (req, res, next) => {
  try {
    // const steamID = req.user.steamID;
    const steamID = req.user.steamID;
    const ownedGames = await steamService.getOwnedGames(steamID);
    // console.log(ownedGames);
    const appids = this.findNewGames(ownedGames);
    // steamService.getManyAppDetails(appids);

    next();
  } catch (err) {
    console.log('Error fetching owned games:' + err);
    res.status(500).json({
      message: 'Failed to fetch owned games',
      error: err.message,
    });
  }
};

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

// exports.fetchGame = async (req, res, next) => {
//   try {
//     const game = await steamService.getAppDetails();
//     console.log(game);
//     next();
//   } catch (err) {
//     console.log(err);
//   }
// };
