import { Button } from "@chakra-ui/react";
import { FaSteam } from "react-icons/fa";

const AuthButton = () => {
  return (
    <Button
      leftIcon={<FaSteam />}
      textColor={"white"}
      bgColor="#17252A"
      variant={"solid"}
      size={"lg"}
      onClick={() =>
        (window.location.href = "http://localhost:3000/auth/steam")
      }
      _hover={{ bgColor: "#17252A" }}
      p={10}
    >
      LOGIN WITH STEAM
    </Button>
  );
};

export default AuthButton;
