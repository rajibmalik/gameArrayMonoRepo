import React, { useState, useEffect } from "react";
import axios from "axios";

interface UserData {
  steamID: number;
  username: string;
}

const Library = () => {
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
        setError(err.response.data.message);
      });
  };

  return (
    <div>
      {error && <p>Error loading: {error}</p>}
      {userData && (
        <div>
          <h2>
            Welcome, {userData.steamID} {userData.username}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Library;
