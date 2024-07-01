const steamService = require('../services/steamService');

exports.fetchOwnedGames = async (req, res, next) => {
  try {
    // const steamID = req.user.steamID;
    const steamID = req.user.steamID;
    const ownedGames = await steamService.getOwnedGames(steamID);
    console.log(ownedGames);

    next();
  } catch (err) {
    console.log('Error fetching owned games:' + err);
    res.status(500).json({
      message: 'Failed to fetch owned games',
      error: err.message,
    });
  }
};
