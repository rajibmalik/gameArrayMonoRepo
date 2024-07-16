import axios from "axios";
import { useEffect, useState } from "react";

interface UserData {
  steamID: number;
  username: string;
}

const useSessionData = () => {
  const [userData, setUserData] = useState<UserData>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<{ user: UserData }>("http://localhost:3000/api/v1/session", {
        withCredentials: true,
      })
      .then((res) => {
        // Sets userData to user session object, created in Passport.js in Express backend
        setUserData(res.data.user);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);
  return { userData, error };
};

export default useSessionData;
