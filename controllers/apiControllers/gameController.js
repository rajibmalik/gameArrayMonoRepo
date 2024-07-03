const Game = require('../../model/gameModel');

exports.getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json({
      status: 'success',
      results: games.length,
      data: {
        games: games,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
