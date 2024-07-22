const User = require('../models/userModel');
const Game = require('../models/gameModel');
const UserGame = require('../models/userGameModel');

exports.clearDatabase = async () => {
  try {
    await User.deleteMany({});
    await Game.deleteMany({});
    await UserGame.deleteMany({});
  } catch (err) {
    console.error('Error clearing the database:', err.message);
  }
};

exports.createInitialData = async () => {
  try {
    // Create User documents
    const users = [
      { steamID: '12356789123456789', username: 'userOne' },
      { steamID: '23456789123456789', username: 'userTwo' },
      { steamID: '34567891234567890', username: 'userThree' },
      { steamID: '45678912345678901', username: 'userFour' },
    ];
    await User.insertMany(users);

    // Create Game documents
    const games = [
      { appid: '1', name: 'gameOne', genres: ['Action', 'RPG'] },
      { appid: '2', name: 'gameTwo', genres: ['RPG', 'Survival'] },
      { appid: '3', name: 'gameThree', genres: ['Simulation'] },
      { appid: '4', name: 'four', genres: ['Building'] },
      { appid: '5', name: 'five', genres: ['Action'] },
      { appid: '6', name: 'six', genres: ['Horror'] },
    ];
    await Game.insertMany(games);
  } catch (err) {
    console.error('Error creating initial data:', err.message);
  }
};

exports.createLargeData = async () => {
  try {
    // Create many Game documents
    const manyGames = [];

    for (let i = 1000; i < 2000; i++) {
      manyGames.push({
        appid: i.toString(),
        name: `game${i}`,
      });
    }
    await Game.insertMany(manyGames);

    // Create UserGame documents
    const userGames = [
      // User one games
      { appid: '1', steamid: '12356789123456789', playtime: 100 },
      { appid: '2', steamid: '12356789123456789', playtime: 200 },
      { appid: '3', steamid: '12356789123456789', playtime: 300 },
      { appid: '4', steamid: '12356789123456789', playtime: 250 },
      // User four games
      { appid: '1', steamid: '45678912345678901', playtime: 100 },
      { appid: '2', steamid: '45678912345678901', playtime: 200 },
      { appid: '3', steamid: '45678912345678901', playtime: 350 },
      { appid: '4', steamid: '45678912345678901', playtime: 450 },
      { appid: '5', steamid: '45678912345678901', playtime: 50 },
      { appid: '6', steamid: '45678912345678901', playtime: 75 },
    ];
    await UserGame.insertMany(userGames);

    // Create many UserGame documents
    const manyUserGames = [];
    for (let i = 1000; i < 2000; i++) {
      manyUserGames.push({
        appid: i.toString(),
        steamid: '34567891234567890',
        playtime: Math.floor(Math.random() * 1000) + 1,
      });
    }
    await UserGame.insertMany(manyUserGames);
  } catch (err) {
    console.error('Error creating large data:', err.message);
  }
};
