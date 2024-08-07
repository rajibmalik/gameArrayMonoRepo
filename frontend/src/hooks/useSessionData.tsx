import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface UserData {
  steamID: string;
  username: string;
}

const useSessionData = () => {
  const [userData, setUserData] = useState<UserData>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    apiClient
      .get<{ user: UserData }>("/session", {
        signal: controller.signal,
        withCredentials: true,
      })
      .then((res) => {
        // Sets userData to user session object, created in Passport.js in Express backend
        setUserData(res.data.user);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);
  return { userData, error, isLoading };
};

export default useSessionData;
