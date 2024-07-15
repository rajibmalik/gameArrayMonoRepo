const Game = require('../../models/gameModel');

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

exports.getGame = async (req, res) => {
  try {
    const game = await Game.findOne({ appid: req.params.appid });

    res.status(200).json({
      status: 'success',
      data: {
        game: game,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
