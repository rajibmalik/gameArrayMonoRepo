import { Select } from "@chakra-ui/react";
import { IoMdArrowDropdown } from "react-icons/io";

const ratings = ["0", "1", "2", "3", "4", "5"];

interface Props {
  onRatingChange: (rating: number | null) => void;
}

const RatingFilter = ({ onRatingChange }: Props) => {
  return (
    <Select
      minWidth={"75px"}
      maxWidth={"125px"}
      icon={<IoMdArrowDropdown />}
      backgroundColor={"#FEFFFF"}
      borderColor={"black"}
      placeholder="RATING"
      onChange={(event) => {
        const value = event.target.value;
        onRatingChange(value === "" ? null : Number(value));
      }}
      color={"black"}
    >
      {ratings.map((rating) => (
        <option key={rating} value={rating}>
          {rating}
        </option>
      ))}
    </Select>
  );
};

export default RatingFilter;
