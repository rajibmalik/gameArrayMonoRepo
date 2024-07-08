import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#2B7A78",
        fontFamily: "Inter",
        color: "white",
      },
    },
  },
});

export default theme;
