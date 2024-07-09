import React from "react";
import { UserGame } from "../hooks/useUserGames";
import { Card, CardBody, Heading, Image } from "@chakra-ui/react";

interface Props {
  game: UserGame;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card borderRadius={5} overflow={"hidden"}>
      <Image src={game.headerImage}></Image>
      <CardBody>
        <Heading overflow={"hidden"} fontSize="2xl">
          {game.name}
        </Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
