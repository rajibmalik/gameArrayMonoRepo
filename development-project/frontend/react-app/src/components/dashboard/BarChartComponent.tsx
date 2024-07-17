import { Box } from "@chakra-ui/react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { UserGame } from "../../hooks/useUserGames";

interface Props {
  userGames: UserGame[];
}

const BarChartComponent = ({ userGames }: Props) => {
  const data = userGames.map((userGame) => ({
    name: userGame.name,
    playtimeHours: userGame.playtimeHours,
  }));

  return (
    <Box
      bg="white"
      p="3"
      borderRadius="md"
      boxShadow="md"
      width={"100%"}
      height={"100%"}
    >
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip shared={false} trigger="click" />
          <Legend />
          <Bar dataKey="playtimeHours" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarChartComponent;
