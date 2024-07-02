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

    // console.log(playedGames);

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

// A utility function that takes the games owned by the user and
// checks for new games that do not exist in the database
exports.findNewGames = async (ownedGames) => {
  try {
    // 1) Obtain appids array from ownedGames object
    const appids = ownedGames.map((game) => game.appid);

    // 2) Query MongoDB to find existing games
    const allDatabaseGames = await gameService.getAllGames();
    const allDatabaseGamesids = allDatabaseGames.map((game) => game.appid);

    // 3 Filter out new appids that are not in the database
    const newGamesids = appids.filter(
      (game) => !allDatabaseGamesids.includes(game.toString()),
    );

    return newGamesids;
  } catch (err) {
    console.log(err);
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

    const games = [];

    for (let i = 0; i < responseData.length; i++) {
      const appid = Object.keys(responseData[i])[0].toString();
      console.log(appid);
      const success = responseData[i][appid].success;
      console.log(success);

      if (success) {
        const data = responseData[i][appid].data;

        const game = {
          appid: appid,
          name: data.name,
          headerImage: data.header_image,
          genres: data.genres
            ? data.genres.map((genre) => genre.description)
            : [],
        };

        console.log(game);

        games.push(game);
        console.log(`Number of games ${games.length}`);
      }
    }

    req.games = games;

    next();
  } catch (err) {
    console.log(err);
  }
};

// test method to create game models from game objects
exports.createGamesInDatabase = async (req, res, next) => {
  try {
    console.log('Creating games');
    const games = req.games;
    // const games = [
    //   {
    //     appid: '22380',
    //     name: 'Fallout: New Vegas',
    //     headerImage:
    //       'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/22380/header.jpg?t=1665072891',
    //     genres: ['Action', 'RPG'],
    //   },
    //   {
    //     appid: '12830',
    //     name: 'Operation Flashpoint: Dragon Rising',
    //     headerImage:
    //       'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/12830/header.jpg?t=1627920748',
    //     genres: ['Action'],
    //   },
    // ];

    await gameService.createGames(games);

    next();
  } catch (err) {
    console.log(err);
  }
};
