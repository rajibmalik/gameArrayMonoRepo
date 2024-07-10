import { Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
          onSearch(ref.current.value);
        }
      }}
    >
      <InputGroup size="lg">
        <Input
          ref={ref}
          variant="filled"
          placeholder="Search game"
          size="lg"
        ></Input>
        <InputRightAddon>
          <FaMagnifyingGlass />
        </InputRightAddon>
      </InputGroup>
    </form>
  );
};

export default SearchBar;
