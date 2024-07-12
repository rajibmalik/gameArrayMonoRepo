import {
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Box,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  title: string;
  number: number;
  supplement?: string;
}

const SingleStat = ({ title, number, supplement }: Props) => {
  return (
    <Card width="100%" height="100%">
      <CardBody>
        <Flex alignItems="center" justifyContent="space-between">
          <Stat>
            <StatLabel textAlign={"center"}>{title}</StatLabel>
            <StatNumber textAlign={"center"}>
              {number} {supplement}
            </StatNumber>
          </Stat>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default SingleStat;
