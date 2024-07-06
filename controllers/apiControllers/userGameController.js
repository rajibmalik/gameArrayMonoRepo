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

// Utility method for getting the UserGames with Game data associated with a steamid
const getUserGamesWithGames = async (steamid) => {
  try {
    // Find UserGame documents associated with a steamid
    const userGames = await UserGame.find({ steamid });

    // Create an array of the appids from the UserGames
    const appids = userGames.map((userGame) => userGame.appid);

    // Find Game information related to the UserGame using the appid
    const games = await Game.find({ appid: { $in: appids } });

    // Combine UserGames with Games information
    const userGamesWithGames = userGames.map((userGame) => {
      // Find the corresponding game for the userGame
      const game = games.find((game) => game.appid === userGame.appid);

      // Return combined data
      return {
        ...userGame._doc,
        playtimeHours: Math.round(userGame._doc.playtime / 60),
        ...game._doc,
      };
    });

    return userGamesWithGames;
  } catch (err) {
    console.error('Error fetching user games:', err);
    throw new Error('Failed to fetch user games'); // caught by caller
  }
};

exports.getAllUserGamesAndGamesForOneUser = async (req, res) => {
  const { steamid } = req.params;

  try {
    const userGamesWithGames = await getUserGamesWithGames(steamid);

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

exports.getTop10PlayedGames = async (req, res) => {
  const steamid = req.params.steamid;
  try {
    const userGamesWithGames = await getUserGamesWithGames(steamid);
    // Sort by playtime in descending order
    userGamesWithGames.sort((a, b) => b.playtime - a.playtime);
    // Filter for the top 10 playtime
    const top10UserGamesWithGames = userGamesWithGames.slice(0, 10);

    res.status(200).json({
      status: 'success',
      results: top10UserGamesWithGames.length,
      data: {
        userGames: top10UserGamesWithGames,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getTopPlayedGenres = async (req, res) => {
  const steamid = req.params.steamid;
  // Number of genres to retrieve
  const numberOfGenres = req.params.genres;
  try {
    const userGames = await getUserGamesWithGames(steamid);

    const topGenres = calculateTopGenres(userGames, numberOfGenres);

    res.status(200).json({
      status: 'success',
      results: topGenres.length,
      data: { topGenres },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Utility method, that calculates the most played genres
const calculateTopGenres = (userGames, numberOfGenres) => {
  const genrePlaytime = {};

  // Iterate for each game
  userGames.forEach((game) => {
    // Iterate for each genre within the game
    game.genres.forEach((genre) => {
      // If genrePlaytime[genre] already exist, add to that value, else add from 0
      genrePlaytime[genre] = (genrePlaytime[genre] || 0) + game.playtime;
    });
  });

  // Sort by the genres (keys) in the genrePlaytime object by descending order, returns as array
  const sortedGenres = Object.keys(genrePlaytime).sort(
    (a, b) => genrePlaytime[b] - genrePlaytime[a],
  );

  // Obtain numberOfGenres, for each obtain the genre and the total playtime from
  // genrePlaytime
  const topGenres = sortedGenres.slice(0, numberOfGenres).map((genre) => ({
    genre,
    totalPlaytime: genrePlaytime[genre],
    totalPlaytimeHours: Math.round(genrePlaytime[genre] / 60),
  }));

  return topGenres;
};
