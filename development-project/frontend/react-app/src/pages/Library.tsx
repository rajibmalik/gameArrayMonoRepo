import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import GameGrid from "../components/GameGrid";
import SearchBar from "../components/SearchBar";
import useSessionData from "../hooks/useSessionData";
import { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";

export interface GameQuery {
  steamID: number | null;
  username: string | null;
  searchText: string;
  genre: string;
}

const Library = () => {
  const { userData, error, isLoading } = useSessionData();
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  // Set userData in gameQuery
  useEffect(() => {
    if (userData) {
      setGameQuery((prevGameQuery) => ({
        ...prevGameQuery,
        steamID: userData.steamID,
        username: userData.username,
      }));
    }
  }, [userData]);

  // Update gameQuery with searchText when input is given
  const handleSearch = (searchText: string) => {
    setGameQuery((prevGameQuery) => ({
      ...prevGameQuery,
      searchText: searchText,
    }));
  };

  const handleGenreChange = (genre: string) => {
    console.log(genre);
    setGameQuery((prevGameQuery) => ({
      ...prevGameQuery,
      genre: genre,
    }));
  };

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
          <SearchBox
            onSearch={handleSearch}
            onGenreChange={handleGenreChange}
          />
        </Box>
      </GridItem>
      <GridItem area="main">
        {isLoading && <Text>Loading</Text>}
        {error && <p>Error loading: {error}</p>}
        {userData && <GameGrid gameQuery={gameQuery} />}
      </GridItem>
    </Grid>
  );
};

export default Library;
