import { Box } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import GenreFilter from "./GenreFilter";

interface Props {
  onSearch: (searchText: string) => void;
  onGenreChange: (genre: string) => void;
}

const SearchBox = ({ onSearch, onGenreChange }: Props) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"100%"}
    >
      <GenreFilter onGenreChange={onGenreChange} />
      <SearchBar onSearch={onSearch} />
    </Box>
  );
};

export default SearchBox;
