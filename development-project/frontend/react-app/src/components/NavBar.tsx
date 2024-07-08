import { HStack, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <VStack>
      <Heading size={"xs"}>SteamArray</Heading>
      <HStack width={"100%"} pb={10} justifyContent={"space-between"}>
        <Link to="/library">
          <Heading cursor="pointer">Library</Heading>
        </Link>
        <Link to="/dashboard">
          <Heading cursor="pointer">Dashboard</Heading>
        </Link>
      </HStack>
    </VStack>
  );
};

export default NavBar;
