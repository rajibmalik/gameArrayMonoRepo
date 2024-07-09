import { UserGame } from "../hooks/useUserGames";
import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import { FaClock } from "react-icons/fa6";
import { Badge } from "@chakra-ui/react";

interface Props {
  game: UserGame;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card borderRadius={5} overflow={"hidden"}>
      <Image src={game.headerImage}></Image>
      <CardBody>
        <Heading
          minH={"65px"}
          //   height={"80px"}
          display={"flex"}
          justifyContent={"center"}
          overflow={"hidden"}
          fontSize="xl"
          textOverflow="ellipsis" // Adds ellipsis for overflow text
        >
          {game.name}
        </Heading>
        <HStack padding={"5px"} justifyContent={"center"}>
          <Badge>{game.playtimeHours} hours playtime</Badge>
          <FaClock />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
