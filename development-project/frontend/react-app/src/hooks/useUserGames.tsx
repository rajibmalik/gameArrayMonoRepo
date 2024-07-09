import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

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
const useUserGames = (steamID: number | null) => {
  // Initialises to empty [] of type UserGame defined in above interface
  const [userGames, setUserGames] = useState<UserGame[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Cancelling the asynchronous operation
    const controller = new AbortController();
    apiClient
      // Defines the get respones type to above inteface fetchUserGamesResponse
      .get<fetchUserGamesResponse>(`/usergames/${steamID}`, {
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
  }, []);

  // Return the userGames and error, enables caller to process data
  return { userGames, error };
};

export default useUserGames;
