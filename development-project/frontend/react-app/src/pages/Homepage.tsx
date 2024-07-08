import { Flex, HStack, Heading, VStack } from "@chakra-ui/react";
import LoginBox from "../components/LoginBox";
import { HomepageBox } from "../components/HomepageBox";

const Homepage = () => {
  return (
    <>
      <Flex
        minHeight={"100vh"}
        minWidth={"100vw"}
        alignItems={"center"}
        justifyContent={"center"}
        // backgroundColor={"black"}
      >
        <VStack
          minHeight={"100%"}
          minWidth={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          // backgroundColor={"red"}
        >
          <Heading marginBottom={5}>Welcome to Game Array</Heading>
          <LoginBox></LoginBox>
          <HStack>
            <Heading>Gain Access To</Heading>
          </HStack>
          <HStack marginTop={15} width={"100%"} justifyContent={"space-around"}>
            <VStack>
              <Heading>Gaming Library</Heading>
              <HomepageBox />
            </VStack>
            <VStack>
              <Heading>Dashboard</Heading>
              <HomepageBox />
            </VStack>
          </HStack>
        </VStack>
      </Flex>
      {/* <Flex
        minHeight={"100%"} // Full height of the viewport
        minWidth={"100%"} // Full width of the viewport
        alignItems="center" // Center items vertically
        justifyContent="center" // Center items horizontally
        // backgroundColor="black" // Set background color
      >
        <VStack
          // paddingTop={5}
          paddingLeft={5}
          paddingRight={5}
          paddingBottom={10}
          backgroundColor={"red"}
          minHeight={"100%"}
          minWidth={"100%"}
          // spacing={3}
          alignItems="center" // Center items vertically
          justifyContent="center"
        >
          <Heading size={{ base: "lg", md: "xl" }}>
            Welcome to GameArray
          </Heading>
         
          <Heading size={{ base: "md", md: "lg" }}> Gain Access To</Heading>
          <HStack
            paddingTop={15}
            width={"100%"}
            justifyContent={"space-between"}
            backgroundColor={"black"}
          >
            <VStack>
              <Heading size={{ base: "md", md: "lg" }}>Gaming Library</Heading>
              <Box
                backgroundColor={"#17252A"}
                height={{ base: 250, md: 350 }}
                width={{ base: 350, md: 450 }}
                borderWidth={5}
                borderColor={"white"}
                borderRadius={10}
                flexWrap={"wrap"}
              ></Box>
            </VStack>
            <VStack>
              <Heading size={{ base: "md", md: "lg" }}>Dashboard</Heading>
              <Box
                backgroundColor={"#17252A"}
                height={{ base: 250, md: 350 }}
                width={{ base: 350, md: 450 }}
                borderWidth={5}
                borderColor={"white"}
                borderRadius={10}
                flexWrap={"wrap"}
              ></Box>
            </VStack>
          </HStack>
        </VStack>
      </Flex> */}
    </>
  );
};

export default Homepage;
