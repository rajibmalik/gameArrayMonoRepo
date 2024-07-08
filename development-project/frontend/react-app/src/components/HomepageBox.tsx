import { Box } from "@chakra-ui/react";

export const HomepageBox = () => {
  return (
    <Box
      backgroundColor={"#17252A"}
      height={{ base: 250, md: 350 }}
      width={{ base: 350, md: 450 }}
      borderWidth={3}
      borderColor={"white"}
      borderRadius={10}
      flexWrap={"wrap"}
      margin={5}
    ></Box>
  );
};
