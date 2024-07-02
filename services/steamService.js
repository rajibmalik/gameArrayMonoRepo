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
          key: process.env.STEAM_API_KEY_TWO,
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

// Sleep method for delaying requests to steam API
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Max number of concurrent requests allowed
const MAX_CONCURRENT_REQUESTS = 10;

// Fetches details for an array of app ID's from the Steam API
// Queries the API in concurrent batches of 5, with a short delay between batches
// to prevent rate limiting
const getAppDetails = async (appIDs) => {
  try {
    const appDetails = []; // Stores app details
    let currentRequests = []; // Store current batch of requests

    for (const appID of appIDs) {
      // Starts a request to fetch the details of an appID
      const request = axios
        .get(`https://store.steampowered.com/api/appdetails/?appids=${appID}`)
        .then((response) => {
          // Check if the response is successful and contains data
          if (
            response.data &&
            response.data[Object.keys(response.data)[0]].success
          ) {
            // Add app details to appDetails array
            appDetails.push(response.data);
          }
        })
        .catch((error) => {
          console.error(`Error fetching details for appID ${appID}:`, error);
        });

      // Add the request to the concurrent batch
      currentRequests.push(request);

      // If number in batch exceeds max concurrent requests,
      // wait for current batch requests to complete
      if (currentRequests.length >= MAX_CONCURRENT_REQUESTS) {
        await Promise.all(currentRequests);
        currentRequests = []; // Reset the current batch
        await sleep(10); // Delay to prevent rate limiting
      }
    }

    // Wait for any remaining requests to complete
    await Promise.all(currentRequests);

    return appDetails;
  } catch (error) {
    console.error('Error fetching app details:', error);
    throw error;
  }
};

const getAppDetailsForOneApp = async (appID) => {
  try {
    const response = await axios.get(
      `https://store.steampowered.com/api/appdetails/?appids=${appID}`,
    );

    return response.data;
  } catch (error) {
    console.error(`Error fetching details for appID ${appID}:`, error);
    throw error;
  }
};

module.exports = {
  getOwnedGames,
  getAppDetails,
  getAppDetailsForOneApp,
};
