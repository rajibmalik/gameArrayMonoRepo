import { Button, ButtonGroup } from "@chakra-ui/react";

const AuthButton = () => {
  return (
    <Button
      colorScheme="blue"
      onClick={() =>
        (window.location.href = "http://localhost:3000/auth/steam")
      }
    >
      Log in to Steam
    </Button>
  );
};

export default AuthButton;
