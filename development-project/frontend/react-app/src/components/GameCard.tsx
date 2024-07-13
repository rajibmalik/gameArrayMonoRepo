import { UserGame } from "../hooks/useUserGames";
import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import { FaClock } from "react-icons/fa6";
import { Badge } from "@chakra-ui/react";

interface Props {
  game: UserGame;
}

const maxGameNameLength = 44;

const GameCard = ({ game }: Props) => {
  const truncatedName =
    game.name.length > maxGameNameLength
      ? `${game.name.substring(0, maxGameNameLength)}...`
      : game.name;
  return (
    <Card
      transition="transform 0.5s"
      _hover={{ transform: "scale(1.05)" }}
      borderRadius={5}
      overflow={"hidden"}
      margin={3}
    >
      <Image src={game.headerImage}></Image>
      <CardBody>
        <Heading
          minH={"65px"}
          display={"flex"}
          justifyContent={"center"}
          overflow={"hidden"}
          fontSize="xl"
        >
          {truncatedName}
        </Heading>
        <HStack padding={"5px"} justifyContent={"center"}>
          <Badge backgroundColor={"white"}>
            {game.playtimeHours} hours played
          </Badge>
          <FaClock />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
