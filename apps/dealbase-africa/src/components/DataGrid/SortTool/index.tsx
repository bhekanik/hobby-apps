import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ColumnInstance, SortingRule, UseSortByColumnProps } from "react-table";
import { SortButtons } from "src/components/DataGrid/SortButtons";
import { SortSelect } from "src/components/DataGrid/SortSelect";

interface Props<T extends object> {
  columns: (ColumnInstance<T> & UseSortByColumnProps<T>)[];
  setSortBy: (sortBy: SortingRule<T>[]) => void;
  defaultSortBy?: SortingRule<T>;
  title?: string;
  noSort?: string[];
}

export const SortTool = <T extends object>({
  columns,
  setSortBy: sort,
  defaultSortBy,
  title,
  noSort,
}: Props<T>) => {
  const [sortTool] = useState<"select" | "buttons">("select");

  return (
    <Flex w="full" mb={2} alignItems="center" justifyContent="center">
      <Flex w="fit-content" gap={2} justifyContent="center" alignItems="center">
        <Text>{title ?? "Sort By"}</Text>
        {sortTool === "select" ? (
          <SortSelect
            columns={columns}
            setSortBy={sort}
            defaultSortBy={defaultSortBy}
            noSort={noSort}
          />
        ) : (
          <SortButtons columns={columns} />
        )}
      </Flex>
    </Flex>
  );
};
