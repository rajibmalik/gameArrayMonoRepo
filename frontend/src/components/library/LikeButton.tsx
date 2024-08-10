import React, { useEffect, useState } from "react";
import useToggleFavourite from "../../hooks/useToggleFavourite";
import { IconButton } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserGame } from "../../hooks/useUserGames";

interface Props {
  steamID: string;
  game: UserGame;
}

const LikeButton = ({ steamID, game }: Props) => {
  const { toggleFavourite, isLoading } = useToggleFavourite(steamID);
  const [isFavourite, setIsFavourite] = useState(game.favourite);

  useEffect(() => {
    setIsFavourite(game.favourite);
  }, [game.favourite]);

  const handleToggleFavourite = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const success = await toggleFavourite(game.appid);

    if (success) {
      setIsFavourite(!isFavourite);
    }
  };

  return (
    <IconButton
      aria-label="Favourite"
      icon={isFavourite ? <FaHeart /> : <FaRegHeart />}
      onClick={handleToggleFavourite}
      isLoading={isLoading}
      position={"absolute"}
      top={2}
      right={2}
      colorScheme={isFavourite ? "red" : "gray"}
    />
  );
};

export default LikeButton;
