const steamService = require('../../services/steamService');
const Game = require('../../models/gameModel');

// This is a controller class for the accountRouter
// it contains relevant middleware for associated with Game models

// Using the steamService, this obtains the games owned by the user and processes
// data for subsequent middleware
exports.fetchAndProcessGames = async (req, res, next) => {
  try {
    const steamID = req.user.steamID;
    const ownedGames = await steamService.getOwnedGames(steamID);
    const playedGames = [];

    // Add games with playtime to playedGames
    ownedGames.forEach((game) => {
      if (game.playtime_forever > 0) {
        playedGames.push(game);
      }
    });

    // Find games which are not already saved to the database
    const newAppids = await this.findNewGames(playedGames);
    req.appids = newAppids;

    // Create an array of games objects containing games and their playtime
    const gamesWithPlaytime = playedGames.map((game) => ({
      appid: game.appid,
      playtime: game.playtime_forever,
    }));

    req.usergames = gamesWithPlaytime;

    next();
    return { gamesWithPlaytime, newAppids };
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
    const allDatabaseGames = await Game.find();
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
    // Times the length of the query
    const startTime = Date.now();

    const appids = req.appids;
    console.log(`appids ${appids}`);
    const responseData = await steamService.getAppDetails(appids);

    // Calculated length of time querying
    const elapsedTime = Date.now() - startTime;
    console.log(`Querying took ${elapsedTime} milliseconds`);

    const games = [];

    // If the response is successful, create a game object and push it to games[]
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

        games.push(game);
        console.log(`Number of games ${games.length}`);
      }
    }

    req.games = games;

    next();
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch owned games',
      error: err.message,
    });
  }
};

// Create game models from game objects passed from queryGames
exports.createGames = async (req, res, next) => {
  try {
    console.log('Creating games');
    const games = req.games;

    // TEST
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

    next();
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch owned games',
      error: err.message,
    });
  }
};
