import { SimpleGrid, Text } from "@chakra-ui/react";
import useUserGames from "../../hooks/useUserGames";
import GameCard from "./GameCard";
import { GameQuery } from "../../pages/Library";

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
  // Retrieves UserGame with Game data
  console.log(`GAME QUERY: ${gameQuery}`);
  const { userGames, error, isLoading } = useUserGames(gameQuery);

  return (
    <>
      {isLoading && <Text>Loading</Text>}
      {error && <Text>{error}</Text>}

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="25px"
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
