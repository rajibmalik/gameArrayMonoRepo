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
  totalAchievements: number;
  acquiredAchievements: number;
  favourite: boolean;
}

// The interface for the response data
interface fetchUserGamesResponse {
  results: number;
  // Uses the UserGame interface when defining UserGame[]
  data: {
    userGames: UserGame[];
  };
}

const useUserGames = (gameQuery: GameQuery) => {
  const [userGames, setUserGames] = useState<UserGame[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!gameQuery.steamID) {
      setUserGames([]);
      return;
    }

    const controller = new AbortController();

    setIsLoading(true);

    const baseUrl = `/usergames/${gameQuery.steamID}`;

    // Create URLSearchParams object for query parameters
    const params = new URLSearchParams();
    if (gameQuery.searchText) params.append("searchtext", gameQuery.searchText);
    if (gameQuery.genre) params.append("genre", gameQuery.genre);
    if (gameQuery.sort) params.append("sort", gameQuery.sort);
    if (gameQuery.showFavourites) params.append("showFavourites", "true");

    // Constructs full URL with base and query parameters
    const url = `${baseUrl}?${params.toString()}`;

    apiClient
      .get<fetchUserGamesResponse>(url, {
        signal: controller.signal,
      })
      .then((res) => {
        setUserGames(res.data.data.userGames);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [gameQuery]);

  return { userGames, error, isLoading };
};

export default useUserGames;
