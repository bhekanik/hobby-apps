import {
  BoxProps,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useMediaQuery,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import {
  HeaderGroup,
  TableBodyPropGetter,
  TableBodyProps,
  TablePropGetter,
  TableProps,
} from "react-table";
import { useUserPermissions } from "src/hooks/useUserPermissions";

interface Props<T extends object> {
  enableEdit?: boolean;
  getTableProps: (propGetter?: TablePropGetter<T> | undefined) => TableProps;
  loading?: boolean;
  headerGroups: HeaderGroup<T>[];
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<T> | undefined
  ) => TableBodyProps;
  headerRow: ReactNode;
  rows: ReactNode;
}

export const TableBase = <T extends object>({
  enableEdit,
  getTableProps,
  headerRow,
  loading = false,
  headerGroups,
  getTableBodyProps,
  rows,
}: Props<T> & BoxProps) => {
  const { permissions } = useUserPermissions();
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  return (
    <Table
      size={isLessThan768 ? "sm" : "md"}
      variant="striped"
      {...getTableProps()}
    >
      <Thead>
        <Tr role="row">{headerRow}</Tr>
      </Thead>
      <Tbody overflow="auto" {...getTableBodyProps()}>
        {loading &&
          ["s1", "s2"].map((row) => (
            <Tr key={row}>
              {headerGroups[0].headers.map((column) => {
                const { key: columnKey, ...restOfColumnProps } =
                  column.getHeaderProps();

                return (
                  <Th key={columnKey} {...restOfColumnProps}>
                    {column.render("Header")}
                  </Th>
                );
              })}
              {permissions.includes("edit:deals") && enableEdit && (
                <Td>
                  <Skeleton></Skeleton>
                </Td>
              )}
            </Tr>
          ))}

        {rows}
      </Tbody>
    </Table>
  );
};
