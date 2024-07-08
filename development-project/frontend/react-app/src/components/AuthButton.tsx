import { Button } from "@chakra-ui/react";
import { FaSteam } from "react-icons/fa";

const AuthButton = () => {
  return (
    <Button
      // colorScheme="blue"
      // backgroundColor={"#2B7A78"}
      leftIcon={<FaSteam />}
      textColor={"white"}
      bgColor="#2B7A78"
      variant={"solid"}
      borderColor={"white"}
      borderWidth={3}
      size={"lg"}
      height={55}
      _hover={{
        transform: "scale(1.05)",
        // boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
        borderColor: "green",
        color: "#90EE90",
      }}
      onClick={() =>
        (window.location.href = "http://localhost:3000/auth/steam")
      }
    >
      Log in with Steam
    </Button>
  );
};

export default AuthButton;
