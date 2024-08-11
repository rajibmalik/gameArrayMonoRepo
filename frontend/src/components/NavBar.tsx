import { Box, HStack, Heading, VStack } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import LogOutButton from "./LogOutButton";

const NavBar = () => {
  const location = useLocation();

  return (
    <VStack backgroundColor="#17252A">
      <HStack
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        pt={1}
      >
        <Heading size={"xs"} pl={3}>
          GameArray
        </Heading>
        <Box pr={3}>
          <LogOutButton />
        </Box>
      </HStack>

      <HStack
        width={"100%"}
        paddingBottom={6}
        paddingLeft={100}
        paddingRight={100}
        justifyContent={"space-between"}
      >
        <Link to="/library">
          <Heading
            cursor="pointer"
            size={"xl"}
            textDecoration={
              location.pathname === "/library" ? "underline" : "none"
            }
          >
            LIBRARY
          </Heading>
        </Link>
        <Link to="/dashboard">
          <Heading
            size={"xl"}
            textDecoration={
              location.pathname === "/dashboard" ? "underline" : "none"
            }
            cursor="pointer"
          >
            DASHBOARD
          </Heading>
        </Link>
      </HStack>
    </VStack>
  );
};

export default NavBar;
