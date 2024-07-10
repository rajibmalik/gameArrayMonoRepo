import { Box, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import GameGrid from "../components/GameGrid";
import SearchBar from "../components/SearchBar";
import useSessionData from "../hooks/useSessionData";
import { useState } from "react";

export interface GameQuery {
  searchText: string;
}

const Library = () => {
  const { userData, error } = useSessionData();
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "search-bar" "main"`,
      }}
    >
      <GridItem top={0} zIndex={20} position={"sticky"} area="nav">
        <NavBar />
      </GridItem>
      <GridItem display={"flex"} justifyContent={"center"} area="search-bar">
        <Box
          margin={10}
          backgroundColor={"#F1F4F7"}
          display={"flex"}
          width={"75%"}
          justifyContent={"center"}
          p={5}
          borderColor={"black"}
          borderRadius={5}
          borderWidth={1}
        >
          <SearchBar onSearch={(searchText) => setGameQuery({ searchText })} />
        </Box>
      </GridItem>
      <GridItem area="main">
        {error && <p>Error loading: {error}</p>}
        {userData && (
          <GameGrid
            gameQuery={gameQuery}
            steamID={userData.steamID}
            username={userData.username}
          />
        )}
      </GridItem>
    </Grid>
  );
};

export default Library;
