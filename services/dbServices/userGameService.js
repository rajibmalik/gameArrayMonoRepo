const UserGame = require('../../model/userGameModel');
const Game = require('../../model/gameModel');
const User = require('../../model/userModel');

// takes an array of game objects and a steamid and updates or creates the UserGame documents
// for that user in the MongoDB database
exports.updateUserGames = async (games, steamid) => {
  try {
    for (const game of games) {
      let { appid, playtime } = game; // destructure parameters from object
      appid = appid.toString(); // ensure type is the same as the MongoDB database
      steamid = steamid.toString(); // ensure type is the same as the MongoDB database

      // Attempt to find the Game and User
      let existingGame = await Game.findOne({ appid: appid });
      let existingUser = await User.findOne({ steamID: steamid });

      // If there is a Game & User, check if there is a corresponding UserGame
      if (existingGame && existingUser) {
        let userGame = await UserGame.findOne({
          appid: appid,
          steamid: steamid,
        });

        // If there is a UserGame, update the UserGame
        if (userGame) {
          userGame.playtime = playtime;
          await userGame.save();
          console.log(`Updated UserGame ${appid}`);
          // If a UserGame does not exist, create a new UserGame
        } else {
          userGame = new UserGame({
            appid: appid,
            playtime: playtime,
            steamid: steamid,
          });

          await userGame.save();
          console.log(`Created UserGame ${appid}`);
        }
      } else {
        console.log(`Game or User is not found for appid: ${appid}`);
      }
    }
  } catch (err) {
    console.log('Error updating usergames' + err.message);
    throw err;
  }
};
