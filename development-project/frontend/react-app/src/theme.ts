import { extendTheme } from "@chakra-ui/react";
import { color } from "framer-motion";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#2B7A78",
        margin: 0,
        padding: 5,
        fontFamily: "Inter",
        color: "white",
      },
    },
  },
});

export default theme;
