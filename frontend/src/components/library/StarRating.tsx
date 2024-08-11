import { Box, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import useRateGame from "../../hooks/useRateGame";
import { UserGame } from "../../hooks/useUserGames";

interface Props {
  appid: string;
  steamID: string;
  game: UserGame;
}

const StarRating = ({ steamID, appid, game }: Props) => {
  const { rateGame } = useRateGame(steamID);
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  useEffect(() => {
    setRating(game.rating);
  }, [game.rating]);

  const handleRating = async (newRating: number) => {
    try {
      const success = await rateGame(appid, newRating);

      if (success) {
        if (rating === newRating) {
          setRating(0);
        } else {
          setRating(newRating);
        }
      }
    } catch (err) {
      console.error("Error submitting rating: ", err);
    }
  };

  return (
    <HStack spacing={2.5} alignItems="center" cursor="pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <Box
          key={star}
          as={FaStar}
          boxSize={8}
          color={
            (hoveredStar !== null ? star <= hoveredStar : star <= rating)
              ? "gold"
              : "gray.400"
          }
          onClick={() => handleRating(star)}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(null)}
          _hover={{ color: "yellow.400" }} // Optional hover effect
          transition="color 0.2s"
        />
      ))}
    </HStack>
  );
};

export default StarRating;
