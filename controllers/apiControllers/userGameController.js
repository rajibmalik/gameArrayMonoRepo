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

exports.getSearchedGamesForOneUser = async (req, res) => {
  const { steamid, searchtext } = req.params;
  try {
    const userGamesWithGames = await getUserGamesWithGames(steamid);

    // filter for game names including searchtext
    const filteredGames = userGamesWithGames.filter((game) => {
      const nameMatches = game.name
        .toLowerCase()
        .includes(searchtext.toLowerCase());
      return nameMatches;
    });

    res.status(200).json({
      status: 'success',
      results: filteredGames.length,
      data: {
        userGames: filteredGames,
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
  try {
    const userGamesWithGames = await getUserGamesWithGames(req.params.steamid);

    res.status(200).json({
      status: 'success',
      results: userGamesWithGames.length,
      data: {
        userGames: userGamesWithGames,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'failed to fetch user games',
      error: err.message,
    });
  }
};

exports.getTop10PlayedGames = async (req, res) => {
  try {
    const userGamesWithGames = await getUserGamesWithGames(req.params.steamid);
    // Sort by playtime in descending order
    userGamesWithGames.sort((a, b) => b.playtime - a.playtime);
    // Filter for the top 10
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
  // genres is the number of genres that shat should be retrieved
  const { steamid, genres } = req.params;
  try {
    const userGames = await getUserGamesWithGames(steamid);
    const topGenres = calculateTopGenres(userGames, genres);

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

exports.getTotalPlaytime = async (req, res) => {
  try {
    const userGamesWithGames = await getUserGamesWithGames(req.params.steamid);
    let totalPlaytime = 0;

    userGamesWithGames.map((game) => {
      totalPlaytime += game.playtimeHours;
    });

    res.status(200).json({
      data: {
        totalPlaytime: totalPlaytime,
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
    // UserGame documents associated with steamid
    const userGames = await UserGame.find({ steamid });

    // Array of the appids from the UserGames
    const appids = userGames.map((userGame) => userGame.appid);

    // Game document information related to the UserGame using the appid
    const games = await Game.find({ appid: { $in: appids } });

    // Combine UserGames with Games information
    const userGamesWithGames = userGames.map((userGame) => {
      // Find the corresponding game for the userGame
      const game = games.find((game) => game.appid === userGame.appid);

      return {
        ...userGame._doc,
        playtimeHours: Math.round(userGame._doc.playtime / 60),
        ...game._doc,
      };
    });

    return userGamesWithGames;
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Utility method, calculates the most played genres
const calculateTopGenres = (userGames, numGenres) => {
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

  // Obtain the most played genres (numGenres), create an array of objects for these "topGenres"
  const topGenres = sortedGenres.slice(0, numGenres).map((genre) => ({
    genre,
    totalPlaytime: genrePlaytime[genre],
    totalPlaytimeHours: Math.round(genrePlaytime[genre] / 60),
  }));

  return topGenres;
};
