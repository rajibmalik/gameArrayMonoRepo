const UserGame = require('./../../model/userGameModel');
// const Game = require('./../../model/gameModel');
const {
  getUserGamesWithGames,
  calculateTopGenres,
} = require('../../utils/userGameControllerUtils');

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
    const numberOfGames = userGamesWithGames.length;
    let totalPlaytime = 0;

    userGamesWithGames.map((game) => {
      totalPlaytime += game.playtimeHours;
    });

    res.status(200).json({
      data: {
        totalPlaytime: totalPlaytime,
        numberOfGames: numberOfGames,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
