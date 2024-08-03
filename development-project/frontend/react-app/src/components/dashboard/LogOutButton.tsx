import { Button } from "@chakra-ui/react";

const LogOutButton = () => {
  return (
    <Button
      onClick={() =>
        (window.location.href = "http://localhost:3000/api/v1/session/logout")
      }
      bg={"#FEFFFF"}
      size={"sm"}
      padding={5}
      borderRadius={"md"}
      margin={"5px"}
    >
      Logout
    </Button>
  );
};

export default LogOutButton;
