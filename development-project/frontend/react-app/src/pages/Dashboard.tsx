import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  return (
    <Grid
      templateAreas={`
      "nav nav"
      "statbox rosechart"
      "statbox2 rosechart"
      "barchart barchart"
    `}
      gridTemplateRows={"auto 1.2fr 1.2fr 2.5fr"}
      gridTemplateColumns={"1.25fr 2.5fr"}
      height="100vh"
      gap={10}
    >
      <GridItem area="nav" backgroundColor="gray">
        <NavBar />
      </GridItem>
      <GridItem margin={5} area="statbox" backgroundColor="red">
        StatBox Content
      </GridItem>
      <GridItem margin={5} area="statbox2" backgroundColor="red">
        StatBox Content
      </GridItem>
      <GridItem margin={5} area="rosechart" backgroundColor="purple">
        RoseChart Content
      </GridItem>
      <GridItem margin={5} area="barchart" backgroundColor="orange">
        BarChart Content
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
