import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import useSessionData from "./useSessionData";
import apiClient from "../services/api-client";

interface FetchTotalPlaytimeResponse {
  data: {
    totalAchievements: number;
    numberOfGames: number;
  };
}

const useTotalAchievements = () => {
  const { userData, error: sessionError } = useSessionData();
  const [totalAchievements, setTotalAchievements] = useState<number>(0);
  const [totalGames, setTotalGames] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (userData) {
      const controller = new AbortController();

      setIsLoading(true);

      apiClient
        .get<FetchTotalPlaytimeResponse>(
          `/usergames/total-achievements/${userData.steamID}`,
          {
            signal: controller.signal,
            withCredentials: true,
          }
        )
        .then((res) => {
          setTotalAchievements(res.data.data.totalAchievements);
          setTotalGames(res.data.data.numberOfGames);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setIsLoading(false);
        });

      return () => controller.abort();
    } else if (sessionError) {
      setError(sessionError);
    }
  }, [userData]);

  return { totalAchievements, totalGames, isLoading, error };
};

export default useTotalAchievements;
