const axios = require('axios');

// Makes a request to the Steam API at the /GetOwned/Games endpoint
// Returns an array containing objects which have:
// appid: id of the app, playtime_forever: hours of playtime
// throws an error to be returned by controller
const getOwnedGames = async (steamID) => {
  try {
    const response = await axios.get(
      'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/',
      {
        params: {
          key: process.env.STEAM_API_KEY,
          steamid: steamID,
          include_played_free_games: true,
        },
      },
    );

    return response.data.response.games;
  } catch (err) {
    console.log('Error fetching owned games ' + err);
    throw new Error(err.message);
  }
};

const updateGameDetails = async (appids) => {
  try {
  } catch (err) {
    console.log('Error updating game details', err.message);
    throw err(err.message);
  }
};

const getAppDetails = async () => {
  try {
    const response = await axios.get(
      'https://store.steampowered.com/api/appdetails/',
      {
        params: {
          appids: 105600,
        },
      },
    );

    return response.data;
  } catch (err) {
    console.log(`Error fetching appd etails for ${appid}`);
    throw new Error(err.message);
  }
};

module.exports = {
  getOwnedGames,
  getAppDetails,
};
