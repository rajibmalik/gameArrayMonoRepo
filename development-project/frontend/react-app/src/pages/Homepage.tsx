import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import AuthButton from "../components/AuthButton";
import InfoContainer from "../components/InfoContainer";

const Homepage = () => {
  return (
    <Grid
      templateAreas={`
      "header header"
      "welcome welcome"
      "login-button login-button"
      "subheading subheading"
      "info-box-one info-box-two"
      "footer footer"
      `}
      gridTemplateRows={"1fr 1fr 1fr 1fr 4fr 1fr "}
      gridTemplateColumns={"1fr 1fr"}
      height="100vh"
      width="100vw"
      gap={5}
    >
      <GridItem area="header">HEADER</GridItem>
      <GridItem area="welcome">
        <Heading size={"xl"} textAlign={"center"}>
          WELCOME
        </Heading>
      </GridItem>
      <GridItem area="login-button">
        <Box display={"flex"} justifyContent={"center"}>
          <AuthButton />
        </Box>
      </GridItem>
      <GridItem area="subheading">
        <Heading size={"xl"} textAlign={"center"}>
          TO ACCESS YOUR
        </Heading>
      </GridItem>
      <GridItem area="info-box-one" margin={10}>
        <InfoContainer
          header={"LIBRARY"}
          image={"/images/Library.png"}
          text={"Explore your gaming collection and search for your games"}
        />
      </GridItem>
      <GridItem area="info-box-two" margin={10}>
        <InfoContainer
          header={"DASHBOARD"}
          image={"/images/Dashboard.png"}
          text={"View graphs visualising your gaming data"}
        />
      </GridItem>
      <GridItem area="footer" margin={10}>
        {" "}
        FOOTER
      </GridItem>
    </Grid>
  );
};

export default Homepage;
