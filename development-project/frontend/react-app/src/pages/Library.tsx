import { Box, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import GameGrid from "../components/GameGrid";
import SearchBar from "../components/SearchBar";
import useSessionData from "../hooks/useSessionData";
import { useState } from "react";

interface Props {
  onSearch: (searchText: string) => void;
}

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
      <GridItem area="nav" backgroundColor={"red"}>
        <NavBar />
      </GridItem>
      <GridItem area="search-bar" backgroundColor={"blue"}>
        <Box p={10}>
          <SearchBar onSearch={(searchText) => setGameQuery({ searchText })} />
        </Box>
      </GridItem>
      <GridItem area="main" backgroundColor={"green"}>
        {error && <p>Error loading: {error}</p>}
        {userData && (
          <GameGrid steamID={userData.steamID} username={userData.username} />
        )}
      </GridItem>
    </Grid>
  );
};

export default Library;
