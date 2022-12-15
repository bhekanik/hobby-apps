import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Button, Flex, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ColumnInstance, SortingRule, UseSortByColumnProps } from "react-table";
import { isProd } from "src/lib/config";
import * as ga from "src/lib/googleAnalytics";

interface Props<T extends object> {
  columns: (ColumnInstance<T> & UseSortByColumnProps<T>)[];
  setSortBy: (sortBy: SortingRule<T>[]) => void;
  defaultSortBy?: SortingRule<T>;
  noSort?: string[];
}

export const SortSelect = <T extends object>({
  columns,
  setSortBy: sort,
  defaultSortBy,
  noSort,
}: Props<T>) => {
  const [sortDir, setSortDir] = useState(() =>
    defaultSortBy?.desc ? "desc" : "asc"
  );

  const [sortBy, setSortBy] = useState<
    (ColumnInstance<T> & UseSortByColumnProps<T>) | undefined
  >(() => columns.find((c) => c.id === defaultSortBy?.id));

  const notifyGoogleAnalytics = (columnId: string) => {
    if (isProd) {
      ga.event({
        action: "sort",
        params: {
          sortField: columnId,
        },
      });
    }
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const column = columns.find(
      (column) => column.id === value
    ) as ColumnInstance<T> & UseSortByColumnProps<T>;
    setSortBy(column);

    notifyGoogleAnalytics(column.id);
  };

  useEffect(() => {
    if (sortBy) {
      sort([{ id: sortBy.id, desc: sortDir === "desc" }]);
    }
  }, [sortBy, sort, sortDir]);

  const handleClick = () => {
    if (sortBy) {
      setSortDir(sortBy.isSortedDesc ? "asc" : "desc");
    }
  };

  return (
    <Flex alignItems="center" justifyContent="center" gap={2}>
      <Select
        w="fit-content"
        size="sm"
        value={sortBy?.id}
        onChange={handleSortByChange}
      >
        {columns
          .filter((c) => !noSort?.includes(c.id) ?? true)
          .map((column) => (
            <option key={column.id} value={column.id}>
              {column.render("Header")}
            </option>
          ))}
      </Select>

      <Button size="sm" onClick={handleClick}>
        <Flex gap={1}>
          <span>
            {sortBy?.isSorted ? (
              sortBy.isSortedDesc ? (
                <ArrowDownIcon />
              ) : (
                <ArrowUpIcon />
              )
            ) : (
              "Sort Direction"
            )}
          </span>
        </Flex>
      </Button>
    </Flex>
  );
};
