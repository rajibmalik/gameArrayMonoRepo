import {
  Box,
  Center,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Img,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import AuthButton from "../components/AuthButton";
import LoginBox from "../components/LoginBox";
import steam from "/images/Steam_icon_logo.svg.png";

const Homepage = () => {
  return (
    <>
      <Flex
        height="100vh" // Full height of the viewport
        width="100vw" // Full width of the viewport
        alignItems="center" // Center items vertically
        justifyContent="center" // Center items horizontally
        // backgroundColor="black" // Set background color
      >
        <VStack height={"100%"} width={"100%"}>
          <Heading>Welcome to GameArray</Heading>
          <Box
            height={200}
            width={400}
            backgroundColor={"#17252A"}
            borderColor={"white"}
            borderWidth={5}
            borderRadius={10}
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Image padding={2} width={100} src={steam}></Image>
            <AuthButton />
          </Box>
          <Heading> Gain Access To</Heading>
          <HStack
            paddingTop={15}
            width={"75%"}
            justifyContent={"space-between"}
          >
            <VStack>
              <Heading>Gaming Library</Heading>
              <Box
                backgroundColor={"#17252A"}
                height={350}
                width={450}
                borderWidth={5}
                borderColor={"white"}
                borderRadius={10}
              ></Box>
            </VStack>
            <VStack>
              <Heading>Dashboard</Heading>
              <Box
                backgroundColor={"#17252A"}
                height={350}
                width={450}
                borderWidth={5}
                borderColor={"white"}
                borderRadius={10}
              ></Box>
            </VStack>
          </HStack>
        </VStack>
      </Flex>
    </>
  );
};

export default Homepage;
