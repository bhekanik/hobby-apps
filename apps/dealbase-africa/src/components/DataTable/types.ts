import {
  ColumnInstance,
  HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
  TablePropGetter,
  TableProps,
  UseSortByColumnProps,
} from "react-table";

export interface TableDataProps<T extends object> {
  enableEdit?: boolean;
  getTableProps: (propGetter?: TablePropGetter<T> | undefined) => TableProps;
  headers: (ColumnInstance<T> & UseSortByColumnProps<T>)[];
  prepareRow: (row: Row<T>) => void;
  page: Row<T>[];
  loading?: boolean;
  headerGroups: HeaderGroup<T>[];
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<T> | undefined
  ) => TableBodyProps;
}
