const UserGame = require('../../model/userGameModel');
const Game = require('../../model/gameModel');
const User = require('../../model/userModel');

// exports.updateUserGames = async (games, steamid) => {
//   try {
//     for (const game of games) {
//       const { appid, playtime } = game;

//       let userGame = await UserGame.findOne({ appid: appid, steamid: steamid });
//       let existingGame = await Game.findOne({ app: appid });
//       let user = await User.findOne({ steamid: steamid });

//       if (userGame) {
//         userGame.playtime = playtime;
//         await userGame.save();
//         console.log(`Updated UserGame: ${appid}`);
//       } else {
//         if (existingGame && user) {
//           userGame = new UserGame({
//             appid,
//             playtime,
//             steamid,
//           });

//           await userGame.save();
//           console.log(`Created UserGame: ${appid}`);
//         }
//       }
//     }
//   } catch (err) {
//     console.log('Error updating usergames' + err.message);
//     throw err;
//   }
// };

exports.updateUserGames = async (games, steamid) => {
  try {
    for (const game of games) {
      let { appid, playtime } = game;
      appid = appid.toString();

      steamid = steamid.toString();

      let existingGame = await Game.findOne({ appid: appid });
      let existingUser = await User.findOne({ steamID: steamid });

      if (existingGame && existingUser) {
        let userGame = await UserGame.findOne({
          appid: appid,
          steamid: steamid,
        });

        if (userGame) {
          userGame.playtime = playtime;
          await userGame.save();
          console.log(`Updated UserGame ${appid}`);
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
