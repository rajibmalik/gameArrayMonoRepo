import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import useUserGames from "../hooks/useUserGames";
import GameCard from "./GameCard";

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
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="15px"
        spacing={10}
      >
        {userGames.map((game) => (
          <GameCard key={game.appid} game={game}></GameCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
