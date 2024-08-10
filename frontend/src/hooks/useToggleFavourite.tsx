import { useState } from "react";
import apiClient from "../services/api-client";

const useToggleFavourite = (steamID: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Example of a closure.
  // toggleFavourite still has access to steamID, and state variables after useToggleFavourite
  // has finished executing
  const toggleFavourite = async (appid: string) => {
    setIsLoading(true);

    try {
      await apiClient.post(`/usergames/toggle-favourite/${steamID}/${appid}`);
      setIsLoading(false);
      return true;
    } catch (err) {
      const message = "An error occured while trying to favourite a usergame";
      setError(err instanceof Error ? `${message}: ${err.message}` : message);
      setIsLoading(false);
      return false;
    }
  };

  return { toggleFavourite, isLoading, error };
};

export default useToggleFavourite;
