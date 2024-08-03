const UserGame = require('../../models/userGameModel');
const Game = require('../../models/gameModel');
const User = require('../../models/userModel');

// Creates or updates UserGame documents in the MongoDB database
exports.createAndUpdateUserGames = async (req, res, next) => {
  try {
    const {
      usergames: games,
      user: { steamID: steamid },
    } = req;

    console.log('createAndUpdateuserGames: ' + JSON.stringify(games, null, 2));

    const [existingGames, existingUser] = await Promise.all([
      Game.find({ appid: { $in: games.map((game) => game.appid.toString()) } }),
      User.findOne({ steamID: steamid }),
    ]);

    if (!existingUser) {
      throw new Error(`User not found for the steamid: ${steamid}`);
    }

    const existingGameAppids = new Set(
      existingGames.map((game) => game.appid.toString()),
    );

    const bulkOps = games
      .filter((game) => existingGameAppids.has(game.appid.toString()))
      .map((game) => {
        const updateFields = {
          playtime: game.playtime,
        };

        if (game.acquiredAchievements !== undefined) {
          updateFields.acquiredAchievements = game.acquiredAchievements;
        }

        return {
          updateOne: {
            filter: { appid: game.appid.toString(), steamid },
            update: { $set: updateFields },
            upsert: true,
          },
        };
      });

    if (bulkOps.length > 0) {
      await UserGame.bulkWrite(bulkOps);
    }

    next();
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch, update and add new games',
      error: err.message,
    });
  }
};
