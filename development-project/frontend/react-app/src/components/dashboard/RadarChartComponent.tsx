import { Box, Heading } from "@chakra-ui/react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface Props {
  topGenres: topGenres[];
}

export interface topGenres {
  genre: string;
  totalPlaytime: number;
  totalPlaytimeHours: number;
}

const RadarChartComponent = ({ topGenres }: Props) => {
  console.log(JSON.stringify(topGenres));
  const hours = topGenres.map((genre) => genre.totalPlaytimeHours);
  const highestPlaytime = Math.max(...hours);

  console.log(hours);
  console.log(highestPlaytime);

  const data = topGenres.map((genreData) => ({
    subject: genreData.genre,
    A: genreData.totalPlaytimeHours,
    fullMark: highestPlaytime,
  }));

  // console.log(`Here is the radar data: ${topGenres}`);

  return (
    <>
      <Box
        bg="black"
        color="white"
        p="2"
        borderRadius="md"
        boxShadow="md"
        // borderWidth={"2"}
        width={"100%"}
        height={"100%"}
        // marginRight={6}
      >
        <Heading size={"sm"} textAlign={"center"}>
          Your most played genres
        </Heading>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tickSize={17.5} />
            <PolarRadiusAxis tick={false} axisLine={false} />
            <Radar
              name="Playtime"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default RadarChartComponent;
