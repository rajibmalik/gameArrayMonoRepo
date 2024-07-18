const userGameService = require('../../services/dbServices/userGameService');

// Creats UserGame documents in the MongoDB database
exports.createUserGames = async (req, res, next) => {
  try {
    // test
    // const games = [
    //   { appid: 17470, playtime: 168 },
    //   { appid: 109600, playtime: 12 },
    // ];

    const games = req.usergames;
    // console.log(`Games HERE: ${games}`);

    userGameService.updateUserGames(games, req.user.steamID);

    next();
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch owned games',
      error: err.message,
    });
  }
};
