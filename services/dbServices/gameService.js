const Game = require('../../model/gameModel');

exports.getAllGames = async () => {
  try {
    const allGames = await Game.find();

    return allGames;
  } catch (err) {
    console.log('Error getAllGames');
    throw error(err);
  }
};

exports.findGameByAppID = async (appid) => {
  try {
    const game = await Game.findOne({ appid });
    return game;
  } catch (err) {
    console.log('Error finding game by appid' + err.message);
  }
};

// exports.updateGameDetails = async (appid, gameDetails) => {
//   try {
//     // Finds a single document in the collection matching the
//     // specified condition (appid) and updated it with
//     // gameDetails an obect containing data
//     // upsert:true indicates that if there are not matching documents
//     // to create a new document based on gameDetails object
//     const updatedGame = await Game.findOneAndUpdate(
//       { appid },
//       { $set: gameDetails },
//       { upsert: true, new: true },
//     );
//     return updatedGame;
//   } catch (err) {
//     console.log('Error updating game details:' + err.message);
//     throw error(err);
//   }
// };
