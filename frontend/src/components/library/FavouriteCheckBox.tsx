import { Checkbox } from "@chakra-ui/react";

interface Props {
  onFavourites: (showFavourites: boolean) => void;
}

const FavouriteCheckBox = ({ onFavourites }: Props) => {
  return (
    <Checkbox
      colorScheme="teal"
      spacing={"1rem"}
      size={"lg"}
      borderColor={"black"}
      color={"black"}
      onChange={(e) => onFavourites(e.target.checked)}
    >
      FAVOURITES
    </Checkbox>
  );
};

export default FavouriteCheckBox;
