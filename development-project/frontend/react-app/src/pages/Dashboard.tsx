import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import SingleStat from "../components/dashboard/SingleStat";

import RadarChartComponent from "../components/dashboard/RadarChartComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import useSessionData from "../hooks/useSessionData";
import BarChartComponent from "../components/dashboard/BarChartComponent";

export interface topGenres {
  genre: string;
  totalPlaytime: number;
  totalPlaytimeHours: number;
}

interface fetchDashboardDataResponse {
  results: number;
  // Uses the UserGame interface when defining UserGame[]
  data: {
    topGenres: topGenres[];
  };
}

interface fetchTotalPlaytimeResponse {
  data: {
    totalPlaytime: number;
  };
}

const Dashboard = () => {
  const { userData, error } = useSessionData();
  const [radarChartData, setRadarChartData] = useState<topGenres[]>([]);
  const [totalPlaytime, setTotalPlaytime] = useState<number>();

  useEffect(() => {
    if (userData) {
      axios
        .get<fetchDashboardDataResponse>(
          `http://localhost:3000/api/v1/usergames/top-genres-by-playtime/${userData.steamID}/6`
        )
        .then((res) => {
          setRadarChartData(res.data.data.topGenres);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      axios
        .get<fetchTotalPlaytimeResponse>(
          `http://localhost:3000/api/v1/usergames/total-playtime/${userData.steamID}`
        )
        .then((res) => {
          setTotalPlaytime(res.data.data.totalPlaytime);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

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

      <GridItem margin={10} mb={0} mt={0} area="statbox" backgroundColor="red">
        <SingleStat label={"Total number of games"} number={0} />
      </GridItem>
      <GridItem margin={10} mb={0} mt={0} area="statbox2" backgroundColor="red">
        {totalPlaytime && (
          <SingleStat
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
        <RadarChartComponent topGenres={radarChartData} />
      </GridItem>
      <GridItem margin={10} marginTop={5} area="barchart">
        <BarChartComponent />
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
