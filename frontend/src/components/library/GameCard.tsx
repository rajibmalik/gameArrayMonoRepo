import { UserGame } from "../../hooks/useUserGames";
import {
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  VStack,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import { FaClock, FaTrophy } from "react-icons/fa6";
import LikeButton from "./LikeButton";
import StarRating from "./StarRating";

interface Props {
  game: UserGame;
  steamID: string;
  testId?: string;
}

const maxGameNameLength = 44;

const GameCard = ({ game, steamID, testId }: Props) => {
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
      data-testid={testId}
      transition="transform 0.5s"
      _hover={{ transform: "scale(1.05)" }}
      borderRadius={5}
      overflow={"hidden"}
      margin={3}
      cursor="pointer"
      position="relative"
    >
      <Tooltip
        label="Click to play"
        fontSize={"md"}
        placement="top"
        hasArrow
        arrowSize={20}
        p={2}
        borderRadius={"md"}
        fontWeight={"bold"}
        bg={"#17252A"}
      >
        <Image src={game.headerImage} onClick={launchGame} />
      </Tooltip>
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
        <LikeButton steamID={steamID} game={game} />
        <VStack justifyContent={"center"}>
          <HStack spacing={7}>
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
          <StarRating appid={game.appid} steamID={steamID} game={game} />
        </VStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
