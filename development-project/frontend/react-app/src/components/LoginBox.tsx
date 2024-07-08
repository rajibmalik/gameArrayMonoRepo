import { Box, Image } from "@chakra-ui/react";
import AuthButton from "./AuthButton";
import steam from "/images/Steam_icon_logo.svg.png";

const LoginBox = () => {
  return (
    <>
      <Box
        height={{ base: 150, md: 200 }}
        width={{ base: 350, md: 400 }}
        backgroundColor={"#17252A"}
        borderColor={"white"}
        borderWidth={3}
        borderRadius={10}
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <Image padding={2} width={{ base: 75, md: 100 }} src={steam}></Image>
        <AuthButton />
      </Box>
    </>
  );
};

export default LoginBox;
