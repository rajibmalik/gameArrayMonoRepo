import { Checkbox } from "@chakra-ui/react";

interface Props {
  onFavourites: (showFavourites: boolean) => void;
}

const FavouriteCheckBox = ({ onFavourites }: Props) => {
  return (
    <Checkbox
      colorScheme="teal"
      spacing={"0.5rem"}
      size={"lg"}
      color={"black"}
      onChange={(e) => onFavourites(e.target.checked)}
      sx={{
        ".chakra-checkbox__control": {
          width: "2.3rem",
          height: "2.3rem",
          borderWidth: "1px",
          borderColor: "black",
        },
      }}
    >
      FAVOURITES
    </Checkbox>
  );
};

export default FavouriteCheckBox;
