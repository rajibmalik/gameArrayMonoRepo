import { Box, Flex, VStack } from "@chakra-ui/react";
import AuthButton from "./AuthButton";

const LoginBox = () => {
  return (
    <>
      <VStack>
        <Box
          maxW={"lg"}
          justifyContent={"center"}
          alignContent={"center"}
          //   maxW="lg"
          width={500}
          height={200}
          borderWidth="2px"
          borderRadius="10"
          p={6}
          //   boxShadow="md"

          backgroundColor="#2B7A78"
        >
          <AuthButton></AuthButton>
        </Box>
      </VStack>
    </>
  );
};

export default LoginBox;
