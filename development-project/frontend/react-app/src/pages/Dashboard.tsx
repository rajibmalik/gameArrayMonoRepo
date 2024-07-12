import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import SingleStat from "../components/dashboard/SingleStat";
import { FaSteam } from "react-icons/fa";
import { RadarChart } from "recharts";
import RadarChartComponent from "../components/dashboard/RadarChartComponent";

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
      <GridItem margin={5} mb={0} area="statbox" backgroundColor="red">
        <SingleStat title={"Total number of games"} number={0} />
      </GridItem>
      <GridItem margin={5} mt={0} area="statbox2" backgroundColor="red">
        <SingleStat title={"Total playtime"} number={0} />
      </GridItem>
      <GridItem margin={5} area="rosechart" backgroundColor="purple">
        <RadarChartComponent />
        {/* RoseChart Content */}
      </GridItem>
      <GridItem margin={5} area="barchart" backgroundColor="orange">
        BarChart Content
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
