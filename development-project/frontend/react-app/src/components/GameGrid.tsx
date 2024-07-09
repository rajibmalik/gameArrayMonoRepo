import { Heading, Text } from "@chakra-ui/react";
import useUserGames from "../hooks/useUserGames";

interface UserData {
  steamID: number | null;
  username: string | null;
}

const GameGrid = ({ steamID, username }: UserData) => {
  // Uses custom hook to get the UserGames with their respective game data
  // else error information
  const { userGames, error } = useUserGames(steamID);

  return (
    <>
      <Heading>Welcome {username} to your library</Heading>

      {error && <Text>{error}</Text>}
      <ul>
        {userGames.map((game) => (
          <li key={game.appid}>{game.name}</li>
        ))}
      </ul>
    </>
  );
};

export default GameGrid;
