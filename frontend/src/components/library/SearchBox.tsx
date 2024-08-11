import { Box, Grid } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import GenreFilter from "./GenreFilter";
import SortBy from "./SortBy";
import FavouriteCheckBox from "./FavouriteCheckBox";
import RatingFilter from "./RatingFilter";

interface Props {
  onSearch: (searchText: string) => void;
  onGenreChange: (genre: string) => void;
  onSortChange: (sort: string) => void;
  onFavourites: (showFavourites: boolean) => void;
  onRatingChange: (rating: number | null) => void;
}

const SearchBox = ({
  onSearch,
  onGenreChange,
  onSortChange,
  onFavourites,
  onRatingChange,
}: Props) => {
  return (
    <Box width={"100%"}>
      <Grid templateColumns="1fr auto 1fr" alignItems="center" gap={3}>
        <Box display="flex" justifyContent="flex-start" gap={10}>
          <GenreFilter onGenreChange={onGenreChange} />
          <SortBy onSortChange={onSortChange} />
        </Box>
        <Box display="flex" justifyContent="center">
          <SearchBar onSearch={onSearch} />
        </Box>
        <Box display="flex" justifyContent="center">
          <RatingFilter onRatingChange={onRatingChange} />
          <FavouriteCheckBox onFavourites={onFavourites} />
        </Box>
      </Grid>
    </Box>
  );
};

export default SearchBox;
