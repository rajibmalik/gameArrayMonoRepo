import { Button, Icon } from "@chakra-ui/react";
import { FaSteam } from "react-icons/fa";

const AuthButton = () => {
  const url =
    `${import.meta.env.VITE_RENDER_URL}/auth/steam` ||
    "http://localhost:3000/auth/steam";
  return (
    <Button
      leftIcon={<Icon as={FaSteam} boxSize="3rem" />}
      textColor={"white"}
      bgColor="#17252A"
      variant={"solid"}
      size={"lg"}
      onClick={() => {
        if (import.meta.env.VITE_RENDER_URL) {
          window.location.href = url;
        } else {
          window.location.href = "http://localhost:3000/auth/steam";
        }
      }}
      _hover={{ bgColor: "#17252A" }}
      p={10}
    >
      LOGIN WITH STEAM
    </Button>
  );
};

export default AuthButton;
