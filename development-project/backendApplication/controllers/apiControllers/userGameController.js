const UserGame = require('../../models/userGameModel');
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

exports.getAllUserGames = async (req, res) => {
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
      status: 'success',
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

exports.getFilteredGames = async (req, res) => {
  const { steamid } = req.params;
  const { searchtext, genre, sort } = req.query;

  try {
    const userGamesWithGames = await getUserGamesWithGames(steamid);

    let filteredGames = userGamesWithGames;

    // Filter by searchtext
    if (searchtext) {
      filteredGames = filteredGames.filter((game) =>
        game.name.toLowerCase().includes(searchtext.toLowerCase()),
      );
    }

    // Filter by genre
    if (genre) {
      filteredGames = filteredGames.filter((game) =>
        game.genres.some((g) => g.toLowerCase().includes(genre.toLowerCase())),
      );
    }

    if (sort) {
      switch (sort.toLowerCase()) {
        case 'playtime':
          filteredGames.sort((a, b) => b.playtimeHours - a.playtimeHours);
          break;
        case 'name':
          filteredGames.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    }

    res.status(200).json({
      status: 'success',
      results: filteredGames.length,
      data: {
        userGames: filteredGames,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Failed to fetch filtered games',
      error: err.message,
    });
  }
};
