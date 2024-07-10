import axios from "axios";
import { useEffect, useState } from "react";

interface UserData {
  steamID: number | null;
  username: string | null;
}

const useSessionData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSessionData();
  }, []);

  const fetchSessionData = () => {
    axios
      .get<{ user: UserData }>("http://localhost:3000/api/session", {
        withCredentials: true,
      })
      .then((response) => {
        setUserData(response.data.user);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { userData, error };
};

export default useSessionData;
