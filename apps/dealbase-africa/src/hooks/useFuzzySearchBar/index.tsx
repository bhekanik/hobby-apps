import { Input, InputProps } from "@chakra-ui/react";
import { search } from "fast-fuzzy";
import React, { ComponentType, memo, useEffect } from "react";

interface ListItem {
  name: string;
}

const FuzzySearchBarBase = ({ value, onChange, ...otherProps }: InputProps) => {
  return (
    <Input
      placeholder="Search"
      {...otherProps}
      value={value}
      onChange={onChange}
    />
  );
};

const FuzzySearchBar = memo(FuzzySearchBarBase);

export const useFuzzySearchBar = <T extends ListItem>(
  list: T[]
): { FuzzySearchBar: ComponentType<InputProps>; filteredList: T[] } => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const [filteredList, setFilteredList] = React.useState<T[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    if (searchTerm) {
      const filtered = search(searchTerm, list || [], {
        keySelector: (obj) => obj.name,
      });
      setFilteredList(filtered);
    } else {
      setFilteredList(list || []);
    }
  }, [searchTerm, list]);

  return {
    FuzzySearchBar: (props) => (
      <FuzzySearchBar {...props} value={searchTerm} onChange={handleChange} />
    ),
    filteredList,
  };
};
