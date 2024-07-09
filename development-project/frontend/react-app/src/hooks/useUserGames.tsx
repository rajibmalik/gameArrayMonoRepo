import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

// The interface for a UserGame object that is retrieved from the
// `/usergames/`${steamID}`endpoint, this is the data we are
// in the library section
interface UserGame {
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
    apiClient
      // Defines the get respones type to above inteface fetchUserGamesResponse
      .get<fetchUserGamesResponse>(`/usergames/${steamID}`)
      // Set userGames to userGames array from endpoint
      .then((res) => setUserGames(res.data.data.userGames))
      .catch((err) => setError(err.message));
  }, []);

  // Return the userGames and error, enables caller to process data
  return { userGames, error };
};

export default useUserGames;
