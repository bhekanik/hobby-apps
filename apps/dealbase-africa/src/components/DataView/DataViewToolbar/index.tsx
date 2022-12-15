import { Flex, useMediaQuery } from "@chakra-ui/react";
import { ColumnInstance, SortingRule, UseSortByColumnProps } from "react-table";
import { SortTool } from "src/components/DataGrid/SortTool";
import { DataViewToggle } from "src/components/DataView/DataViewToggle";
import { DataViewType } from "types";

interface Props<T extends object> {
  onChangeDataViewType: (newDataViewType: DataViewType) => void;
  dataViewType: DataViewType;
  headers: (ColumnInstance<T> & UseSortByColumnProps<T>)[];
  setSortBy: (sortBy: SortingRule<T>[]) => void;
  defaultSortBy?: SortingRule<T>;
  actions?: React.ReactElement;
  withSortTool?: boolean;
  noSort?: string[];
}

export const DataViewToolbar = <T extends object>({
  withSortTool = false,
  onChangeDataViewType,
  dataViewType,
  headers,
  setSortBy,
  defaultSortBy,
  actions,
  noSort,
}: Props<T>) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  return (
    <Flex
      mx={2}
      gap={2}
      alignItems="center"
      justifyContent={
        isLessThan768 ? "center" : withSortTool ? "space-between" : "flex-end"
      }
      flexDir={isLessThan768 ? "column" : "row"}
      mb={isLessThan768 ? 8 : 0}
    >
      {withSortTool && (
        <Flex
          justifyContent="space-between"
          position="sticky"
          left={0}
          flexDir={isLessThan768 ? "column" : "row"}
        >
          <SortTool<T>
            setSortBy={setSortBy}
            columns={headers}
            defaultSortBy={defaultSortBy}
            noSort={noSort}
          />
        </Flex>
      )}
      <Flex align="center" gap={2}>
        {actions}
        <DataViewToggle
          onChangeDataViewType={onChangeDataViewType}
          dataViewType={dataViewType}
        />
      </Flex>
    </Flex>
  );
};
