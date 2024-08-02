import { HStack, Heading, VStack } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  return (
    <VStack backgroundColor="#17252A">
      <Heading size={"xs"}>GameArray</Heading>
      <HStack
        width={"100%"}
        paddingX={10}
        paddingBottom={10}
        justifyContent={"space-between"}
      >
        <Link to="/library">
          <Heading
            cursor="pointer"
            size={"2xl"}
            textDecoration={
              location.pathname === "/library" ? "underline" : "none"
            }
          >
            LIBRARY
          </Heading>
        </Link>
        <Link to="/dashboard">
          <Heading
            size={"2xl"}
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
