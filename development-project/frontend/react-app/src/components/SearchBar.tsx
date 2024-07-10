import { Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = () => {
  return (
    <InputGroup size="lg">
      <Input variant="filled" placeholder="Search game" size="lg"></Input>
      <InputRightAddon>
        <FaMagnifyingGlass />
      </InputRightAddon>
    </InputGroup>
  );
};

export default SearchBar;
