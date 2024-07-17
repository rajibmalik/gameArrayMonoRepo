import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import RadarChartComponent from "../components/dashboard/RadarChartComponent";
import BarChartComponent from "../components/dashboard/BarChartComponent";
import TotalPlaytime from "../components/dashboard/TotalPlaytime";
import TotalGames from "../components/dashboard/TotalGames";
import useTopGenres from "../hooks/useTopGenres";
import useTotalPlaytime from "../hooks/useTotalPlaytime";

const Dashboard = () => {
  const {
    totalPlaytime,
    totalGames,
    isLoading: totalPlaytimeLoading,
    error: totalPlaytimeError,
  } = useTotalPlaytime();

  const {
    topGenres,
    isLoading: topGenresLoading,
    error: topGenresError,
  } = useTopGenres();

  return (
    <Grid
      templateAreas={`
      "nav nav"
      "statbox rosechart"
      "statbox2 rosechart"
      "barchart barchart"
    `}
      gridTemplateRows={"auto 1.0fr 1.0fr 2.5fr"}
      gridTemplateColumns={"1.25fr 2.5fr"}
      height="100vh"
      width="100vw"
      gap={5}
    >
      <GridItem area="nav" backgroundColor="gray">
        <NavBar />
      </GridItem>

      <GridItem margin={10} mb={0} mt={0} area="statbox">
        {totalGames && (
          <TotalGames label={"Total number of games"} number={totalGames} />
        )}
      </GridItem>
      <GridItem margin={10} mb={0} mt={0} area="statbox2">
        {totalPlaytime && (
          <TotalPlaytime
            label={"Total playtime"}
            number={totalPlaytime}
            helpText="hours"
          />
        )}
      </GridItem>
      <GridItem
        display={"flex"}
        justifyContent={"end"}
        margin={10}
        mt={0}
        marginBottom={0}
        area="rosechart"
        alignItems={"flex-end"}
      >
        {topGenres && <RadarChartComponent topGenres={topGenres} />}
      </GridItem>
      <GridItem margin={10} marginTop={5} area="barchart">
        <BarChartComponent />
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
