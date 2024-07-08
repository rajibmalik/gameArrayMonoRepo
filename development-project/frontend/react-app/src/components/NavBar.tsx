import { HStack, Heading, VStack } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  return (
    <VStack>
      <Heading size={"xs"}>SteamArray</Heading>
      <HStack width={"100%"} pb={10} justifyContent={"space-between"}>
        <Link to="/library">
          <Heading
            cursor="pointer"
            textDecoration={
              location.pathname === "/library" ? "underline" : "none"
            }
          >
            Library
          </Heading>
        </Link>
        <Link to="/dashboard">
          <Heading
            textDecoration={
              location.pathname === "/dashboard" ? "underline" : "none"
            }
            cursor="pointer"
          >
            Dashboard
          </Heading>
        </Link>
      </HStack>
    </VStack>
  );
};

export default NavBar;
