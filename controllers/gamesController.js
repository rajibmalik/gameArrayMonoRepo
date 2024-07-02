const steamService = require('../services/steamService');
const gameService = require('../services/dbServices/gameService');

// This is a controller class for the accountRouter
// it contains relevant middleware for associated with Game models

// Using the steamService, this obtains the games owned by the user
exports.fetchOwnedGames = async (req, res, next) => {
  try {
    const steamID = req.user.steamID;
    const ownedGames = await steamService.getOwnedGames(steamID);

    const playedGames = [];

    for (let i = 0; i < ownedGames.length; i++) {
      if (ownedGames[i].playtime_forever > 0) {
        playedGames.push(ownedGames[i]);
      }
    }

    const appids = await this.findNewGames(playedGames);

    req.appids = appids;

    next();
  } catch (err) {
    console.log('Error fetching owned games:' + err);
    res.status(500).json({
      message: 'Failed to fetch owned games',
      error: err.message,
    });
  }
};

// Using steamService, queries an array of appids for more game information
exports.queryGames = async (req, res, next) => {
  try {
    console.log('Querying appIDs');
    // Times the length of the query
    const startTime = Date.now();

    // Obtains appids from previous middleware, fetchOwnedGames
    const appids = req.appids;

    // Obtains response data using steamService
    const responseData = await steamService.getAppDetails(appids);

    // Calculated length of time querying
    const elapsedTime = Date.now() - startTime;
    console.log(`Querying took ${elapsedTime} milliseconds`);

    // test;
    // const responseData = await steamService.getAppDetails([
    //   17440, 105600, 4540,
    // ]);
    // console.log(responseData);

    for (let i = 0; i < responseData.length; i++) {
      const appID = Object.keys(responseData[i])[0].toString();
      console.log(appID);
      const success = responseData[i][appID].success;
      console.log(success);

      if (success) {
        const data = responseData[i][appID].data;

        const name = data.name;
        console.log(name);
        const headerImage = data.header_image;
        console.log(headerImage);

        const genres = data.genres;
        let genreNames = [];

        if (genres) {
          for (let i = 0; i < genres.length; i++) {
            genreNames.push(genres[i].description);
          }

          console.log(genreNames);
        }
      }
    }

    next();
  } catch (err) {
    console.log(err);
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

    return newGamesIds;
  } catch (err) {
    console.log(err);
  }
};
