import { Select } from "@chakra-ui/react";
import { IoMdArrowDropdown } from "react-icons/io";

const popularGenres = [
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Shooter",
  "Simulation",
  "Puzzle",
  "Sports",
];

interface Props {
  onGenreChange: (genre: string) => void;
}

const GenreFilter = ({ onGenreChange }: Props) => {
  return (
    <Select
      width={"20%"}
      icon={<IoMdArrowDropdown />}
      backgroundColor={"#FEFFFF"}
      borderColor={"black"}
      placeholder="GENRE"
      onChange={(event) => onGenreChange(event.target.value)}
      color={"black"}
    >
      {popularGenres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </Select>
  );
};

export default GenreFilter;
