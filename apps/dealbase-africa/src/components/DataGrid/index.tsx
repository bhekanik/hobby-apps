import { Grid, useMediaQuery } from "@chakra-ui/react";
import {
  ColumnInstance,
  Row,
  TableRowProps,
  UseSortByColumnProps,
} from "react-table";
import { DataViewToolbar } from "src/components/DataView/DataViewToolbar";
import { DataViewPropsBase } from "src/components/DataView/types";

export interface CardProps<T extends object> {
  key: string | number;
  enableEdit?: boolean;
  row: Row<T>;
  rowProps: Omit<TableRowProps, "key">;
}

interface Props<T extends object> extends DataViewPropsBase<T> {
  renderCard: (props: CardProps<T>) => React.ReactElement;
  noSort?: string[];
}

export const DataGrid = <T extends object>({
  enableEdit,
  onChangeDataViewType,
  dataViewType,
  getTableProps,
  headers,
  prepareRow,
  page,
  setSortBy,
  defaultSortBy,
  renderCard,
  actions,
  noSort,
}: Props<T>) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <DataViewToolbar<T>
        withSortTool
        actions={actions}
        onChangeDataViewType={onChangeDataViewType}
        dataViewType={dataViewType}
        headers={headers as (ColumnInstance<T> & UseSortByColumnProps<T>)[]}
        setSortBy={setSortBy}
        defaultSortBy={defaultSortBy}
        noSort={noSort}
      />

      <Grid
        templateColumns={
          isLessThan768
            ? "repeat(auto-fit, minmax(300px, 1fr))"
            : "repeat(auto-fit, minmax(420px, 1fr))"
        }
        gap={6}
        mt={4}
        {...getTableProps()}
      >
        {page.map((row: Row<T>) => {
          prepareRow(row);
          const { key, ...restOfRowProps } = row.getRowProps();

          return renderCard({
            key,
            enableEdit,
            rowProps: restOfRowProps,
            row,
          });
        })}
      </Grid>
    </>
  );
};
