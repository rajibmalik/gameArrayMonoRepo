import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../components/NavBar";

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
    <Grid
      templateAreas={{
        base: `"nav" "search-bar" "main"`,
      }}
    >
      <GridItem area="nav" backgroundColor={"red"}>
        <NavBar />
      </GridItem>
      <GridItem area="search-bar" backgroundColor={"blue"}>
        {" "}
        search-bar
      </GridItem>
      <GridItem area="main" backgroundColor={"green"}>
        main area
      </GridItem>
    </Grid>

    // <div>
    //   {error && <p>Error loading: {error}</p>}
    //   {userData && (
    //     <div>
    //       <h2>
    //         Welcome, {userData.steamID} {userData.username}
    //       </h2>
    //     </div>
    //   )}
    // </div>
  );
};

export default Library;
