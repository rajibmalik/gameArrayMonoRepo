import React, { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Text } from "@chakra-ui/react";

interface UserGame {
  id: string;
  playtimeHours: number;
  name: string;
  headerImage: string;
}

interface fetchUserGamesResponse {
  results: number;
  data: {
    userGames: UserGame[];
  };
}

interface UserData {
  steamID: number | null;
  username: string | null;
}

const GameGrid = ({ steamID, username }: UserData) => {
  const [userGames, setUserGames] = useState<UserGame[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<fetchUserGamesResponse>(`/usergames/${steamID}`)
      .then((res) => setUserGames(res.data.data.userGames))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {userGames.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </>
  );
};

export default GameGrid;
