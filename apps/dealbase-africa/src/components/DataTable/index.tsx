import { BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import {
  ColumnInstance,
  HeaderGroup,
  TableBodyPropGetter,
  TableBodyProps,
  UseSortByColumnProps,
} from "react-table";
import { TableDataProps } from "src/components/DataTable/types";
import { DataViewToolbar } from "src/components/DataView/DataViewToolbar";
import { DataViewPropsBase } from "src/components/DataView/types";

interface Props<T extends object> extends DataViewPropsBase<T> {
  renderTableData: (props: TableDataProps<T>) => ReactNode;
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<T> | undefined
  ) => TableBodyProps;
  headerGroups: HeaderGroup<T>[];
}

export const DataTable = <T extends object>({
  enableEdit,
  onChangeDataViewType,
  getTableProps,
  headers,
  prepareRow,
  page,
  loading,
  headerGroups,
  getTableBodyProps,
  setSortBy,
  defaultSortBy,
  actions,
  dataViewType,
  renderTableData,
}: Props<T> & BoxProps) => {
  return (
    <>
      <DataViewToolbar<T>
        actions={actions}
        onChangeDataViewType={onChangeDataViewType}
        dataViewType={dataViewType}
        headers={headers as (ColumnInstance<T> & UseSortByColumnProps<T>)[]}
        setSortBy={setSortBy}
        defaultSortBy={defaultSortBy}
      />

      {renderTableData({
        enableEdit,
        getTableProps,
        headers,
        prepareRow,
        page,
        loading,
        headerGroups,
        getTableBodyProps,
      })}
    </>
  );
};
