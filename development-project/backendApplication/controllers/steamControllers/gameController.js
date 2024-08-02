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
      message:
        'Failed to fetch owned games, please ensure your Steam profile is public',
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
      const success = responseData[i][appid].success;

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
    const games = req.games;

    for (const game of games) {
      let existingGame = await Game.findOne({ appid: game.appid });

      if (existingGame === null) {
        await Game.create(game);
      }
    }

    next();
  } catch (err) {
    throw new Error(
      `Failed to create game details from Steam API: ${err.message}`,
    );
  }
};

exports.queryUserAchievements = async (req, res, next) => {
  try {
    const steamid = req.user.steamID;
    const games = req.games;

    const appids = games.map((game) => game.appid);

    const responseData = await steamService.getUserAchievements(
      appids,
      steamid,
    );

    responseData.forEach((game) => {
      const appid = game.appID;

      const gameAchievements = game.achievements;

      if (gameAchievements) {
        const totalAchievements = gameAchievements.length;

        const acquiredAchievements = gameAchievements.filter(
          (a) => a.achieved === 1,
        ).length;

        const gameIndex = req.games.findIndex((game) => game.appid === appid);

        const userIndex = req.usergames.findIndex((game) => {
          return Number(game.appid) === Number(appid);
        });

        if (gameIndex !== -1) {
          req.games[gameIndex].totalAchievements = totalAchievements;
        }

        if (userIndex !== -1) {
          req.usergames[userIndex].acquiredAchievements = acquiredAchievements;
        }
      }
    });

    // console.log(`Updated Games Data: ${JSON.stringify(games, null, 2)}`);
    console.log(
      `Updated userGames Data: ${JSON.stringify(req.usergames, null, 2)}`,
    );

    next();
  } catch (err) {
    console.error(
      `Failed to query game achievements from Steam API in gameController: ${err.message}`,
    );
  }
};
