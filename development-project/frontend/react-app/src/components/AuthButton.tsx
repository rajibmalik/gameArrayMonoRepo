import { Button, ButtonGroup } from "@chakra-ui/react";

const AuthButton = () => {
  return (
    <Button
      colorScheme="blue"
      backgroundColor={"#2B7A78"}
      borderColor={"white"}
      borderWidth={3}
      width={200}
      height={55}
      onClick={() =>
        (window.location.href = "http://localhost:3000/auth/steam")
      }
    >
      Log in to Steam
    </Button>
  );
};

export default AuthButton;
