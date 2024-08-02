import { UserGame } from "../../hooks/useUserGames";
import {
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import { FaClock, FaTrophy } from "react-icons/fa6";
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

  const achievementProgression = Math.round(
    (game.acquiredAchievements / game.totalAchievements) * 100
  );

  const launchGame = () => {
    const gameUrl = `steam://rungameid/${game.appid}`;
    window.location.href = gameUrl;
  };
  return (
    <Card
      transition="transform 0.5s"
      _hover={{ transform: "scale(1.05)" }}
      borderRadius={5}
      overflow={"hidden"}
      margin={3}
      onClick={launchGame}
      cursor="pointer"
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
        <VStack justifyContent={"center"}>
          <HStack>
            <HStack padding={"2.5px"}>
              <Badge backgroundColor={"white"}>
                {game.playtimeHours} hours played
              </Badge>
              <FaClock />
            </HStack>
            {game.acquiredAchievements >= 0 && game.totalAchievements > 0 && (
              <HStack padding={"2.5px"}>
                <Badge backgroundColor={"white"}>
                  {achievementProgression}%
                </Badge>
                <FaTrophy />
              </HStack>
            )}
            {!game.totalAchievements && (
              <HStack padding={"2.5px"}>
                <Badge backgroundColor={"white"}>N/A</Badge>
                <FaTrophy />
              </HStack>
            )}
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
