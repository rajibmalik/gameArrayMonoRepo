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
const useUserGames = ({ steamID, searchText, genre }: GameQuery) => {
  // Initialises to empty [] of type UserGame defined in above interface
  const [userGames, setUserGames] = useState<UserGame[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Cancelling the asynchronous operation
    const controller = new AbortController();

    setIsLoading(true);

    // Base URL
    const baseUrl = `/usergames/${steamID}`;

    // Create URLSearchParams object for query parameters
    const params = new URLSearchParams();
    if (searchText) params.append("searchtext", searchText);
    if (genre) params.append("genre", genre);

    // Constructs full URL with base and query parameters
    const url = `${baseUrl}?${params.toString()}`;

    apiClient
      // Defines the get respones type to above inteface fetchUserGamesResponse
      .get<fetchUserGamesResponse>(url, {
        signal: controller.signal,
      })
      // Set userGames to userGames array from endpoint
      .then((res) => {
        setUserGames(res.data.data.userGames);
        setIsLoading(false);
      })
      .catch((err) => {
        // If request is cancelled, quit the method, else set the error message
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    // cleanup function for aborting the request
    return () => controller.abort();
  }, [steamID, searchText, genre]);

  // Return the userGames and error, enables caller to process data
  return { userGames, error, isLoading };
};

export default useUserGames;
