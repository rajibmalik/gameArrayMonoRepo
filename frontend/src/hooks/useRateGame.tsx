import { useState } from "react";
import apiClient from "../services/api-client";

const useRateGame = (steamID: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const rateGame = async (appid: string, rating: number) => {
    setIsLoading(true);

    try {
      await apiClient.patch(`/usergames/rate/${steamID}/${appid}/${rating}`);
      setIsLoading(false);
      return true;
    } catch (err) {
      const message = "An error occured while trying to rate a usergame";
      setError(err instanceof Error ? `${message}: ${err.message}` : message);
      setIsLoading(false);
      return false;
    }
  };
  return { rateGame, isLoading, error };
};

export default useRateGame;
