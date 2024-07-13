import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { GameQuery } from "../pages/Library";

// The interface for a UserGame object that is retrieved from the
// `/usergames/`${steamID}`endpoint, this is the data we are
// in the library section
export interface UserGame {
  appid: string;
  playtimeHours: number;
  name: string;
  headerImage: string;
}

// The interface for the response data
interface fetchUserGamesResponse {
  results: number;
  // Uses the UserGame interface when defining UserGame[]
  data: {
    userGames: UserGame[];
  };
}

// Takes the steamID to make query related to an authenticated user session
const useUserGames = ({ steamID, searchText }: GameQuery) => {
  // Initialises to empty [] of type UserGame defined in above interface
  const [userGames, setUserGames] = useState<UserGame[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Cancelling the asynchronous operation
    const controller = new AbortController();

    // If there is search text, use searchText & steamID parameters,
    // else just search using steamID as parameter
    const url = searchText
      ? `/usergames/${steamID}/${searchText}`
      : `/usergames/${steamID}`;

    apiClient
      // Defines the get respones type to above inteface fetchUserGamesResponse
      .get<fetchUserGamesResponse>(url, {
        signal: controller.signal,
      })
      // Set userGames to userGames array from endpoint
      .then((res) => setUserGames(res.data.data.userGames))
      .catch((err) => {
        // If request is cancelled, quit the method, else set the error message
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    // cleanup function for aborting the request
    return () => controller.abort();
  }, [steamID, searchText]);

  // Return the userGames and error, enables caller to process data
  return { userGames, error };
};

export default useUserGames;
