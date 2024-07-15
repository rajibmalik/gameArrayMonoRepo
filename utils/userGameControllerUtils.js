const UserGame = require('../models/userGameModel');
const Game = require('../models/gameModel');

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

module.exports = { getUserGamesWithGames, calculateTopGenres };
