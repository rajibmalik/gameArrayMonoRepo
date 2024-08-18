const UserGame = require('../../models/userGameModel');
const Game = require('../../models/gameModel');
const User = require('../../models/userModel');
const steamService = require('../../services/steamService');

// Creates or updates UserGame documents in the MongoDB database
exports.createAndUpdateUserGames = async (req, res, next) => {
  try {
    const {
      usergames: games,
      user: { steamID: steamid },
    } = req;

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

exports.queryUserAchievements = async (req, res, next) => {
  try {
    const steamid = req.user.steamID;
    const games = req.games;

    const appids = games.map((game) => game.appid);

    const responseData = await steamService.getUserAchievements(
      appids,
      steamid,
    );

    responseData.forEach((game) => {
      const appid = game.appID;

      const gameAchievements = game.achievements;

      if (gameAchievements) {
        const totalAchievements = gameAchievements.length;

        const acquiredAchievements = gameAchievements.filter(
          (a) => a.achieved === 1,
        ).length;

        console.log('ACQUIRED: ' + acquiredAchievements);

        const gameIndex = req.games.findIndex((game) => game.appid === appid);

        const userIndex = req.usergames.findIndex((game) => {
          return Number(game.appid) === Number(appid);
        });

        console.log(userIndex);

        if (gameIndex !== -1) {
          req.games[gameIndex].totalAchievements = totalAchievements;
        }

        if (userIndex !== -1) {
          req.usergames[userIndex].acquiredAchievements = acquiredAchievements;
        }
      }
    });

    next();
  } catch (err) {
    console.error(
      `Failed to query game achievements from Steam API in gameController: ${err.message}`,
    );
  }
};
