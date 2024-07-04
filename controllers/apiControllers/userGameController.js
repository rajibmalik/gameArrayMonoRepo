const UserGame = require('./../../model/userGameModel');
const Game = require('./../../model/gameModel');

exports.getAllUserGames = async (req, res) => {
  try {
    const userGames = await UserGame.find();
    res.status(200).json({
      status: 'success',
      results: userGames.length,
      data: {
        userGames: userGames,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAllUserGamesForOneUser = async (req, res) => {
  try {
    const userGames = await UserGame.find({ steamid: req.params.steamid });
    res.status(200).json({
      status: 'success',
      results: userGames.length,
      data: {
        userGames: userGames,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAllUserGamesAndGamesForOneUser = async (req, res) => {
  const { steamid } = req.params;

  try {
    // Find all UserGame documents for a specific steamid
    const userGames = await UserGame.find({ steamid });

    // Create an array of the appids from the UserGames
    const appids = userGames.map((userGame) => userGame.appid);

    // Find Game information related to the UserGame using the appid
    const games = await Game.find({ appid: { $in: appids } });

    // Combine UserGames with Games information
    const userGamesWithGames = userGames.map((userGame) => {
      // Ensure the correct Game is combined with the correct UserGame
      const game = games.find((game) => game.appid === userGame.appid);
      // Return the object containing UserGame and corresponding Game information
      return {
        steamid: userGame.steamid,
        appid: userGame.appid,
        game: game || { name: 'Unknown Game' },
      };
    });

    res.status(200).json({
      status: 'success',
      results: userGamesWithGames.length,
      data: {
        userGames: userGamesWithGames,
      },
    });
  } catch (err) {
    console.error('Error fetching user games:', err);
    res.status(500).json({
      status: 'fail',
      message: 'failed to fetch user games',
      error: err.message,
    });
  }
};
