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

    if (response.status !== 200) {
      throw new Error(`HTTP error with status: ${response.status}`);
    }

    return response.data.response.games;
  } catch (err) {
    throw new Error(
      `Failed to fetch owned games from Steam API: ${err.message}`,
    );
  }
};

// Sleep method for delaying requests to steam API
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Max number of concurrent requests allowed
const MAX_CONCURRENT_REQUESTS = 20;

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
        .get(
          `https://store.steampowered.com/api/appdetails/?appids=${appID}&l=english`,
        )
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
        .catch((err) => {
          throw new Error(`Error fetching details for appID ${appID}:`, err);
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
  } catch (err) {
    throw new Error(
      `Failed to fetch game details from Steam API: ${err.message}`,
    );
  }
};

const getUserAchievements = async (appIDs, steamID) => {
  try {
    const achievements = [];
    let currentRequests = [];

    for (const appID of appIDs) {
      console.log(`Querying game achievements for ${appID}`);
      const request = axios
        .get(
          `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/`,
          {
            params: {
              appid: appID,
              key: process.env.STEAM_API_KEY,
              steamid: steamID,
            },
          },
        )
        .then((response) => {
          if (response.data.playerstats && response.data.playerstats.success) {
            achievements.push({
              appID: appID,
              achievements: response.data.playerstats.achievements,
            });
          } else
            achievements.push({
              appID: appID,
              achievements: null,
            });
        })
        .catch((err) => {
          const message = 'Game may not have any achievement details';
          console.error(
            `Error fetching achievements for appID ${appID}: ${err.message}, ${message}`,
          );
          achievements.push({
            appID: appID,
            achievements: null,
          });
        });

      currentRequests.push(request);

      if (currentRequests.length >= MAX_CONCURRENT_REQUESTS) {
        await Promise.all(currentRequests);
        currentRequests = [];
        await sleep(10);
      }
    }

    await Promise.all(currentRequests);

    console.log('Achievements: ' + JSON.stringify(achievements, null, 2));

    return achievements;
  } catch (err) {
    throw new Error(`Failed to fetch game achievements from Steam API: ${err}`);
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
  getUserAchievements,
};
