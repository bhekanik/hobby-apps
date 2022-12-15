import {
  Box,
  Heading,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { Cell, Row, usePagination, useSortBy, useTable } from "react-table";
import { Pagination } from "src/components/DataTable/Pagination";
import { Subscriber } from "src/pages/api/subscribers";
import { TableInstanceWithHooks } from "types";

interface Props {
  heading?: boolean;
  subscribers: Subscriber[];
  subscribersLoading: boolean;
}

export const SubscriberTable = ({
  subscribers,
  subscribersLoading,
  heading,
}: Props) => {
  const columns = useMemo(
    () => [
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "First Name",
        accessor: "firstname",
      },
      {
        Header: "Last Name",
        accessor: "lastname",
      },
      {
        Header: "Company",
        accessor: "company",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Created At",
        accessor: "created_at",
      },
    ],
    []
  );

  const data = useMemo(() => subscribers, [subscribers]);

  const sortBy = useMemo(
    () => [
      {
        id: "email",
        desc: false,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      columns,
      data,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      initialState: { pageIndex: 0, sortBy },
    },
    useSortBy,
    usePagination
  ) as TableInstanceWithHooks<Subscriber>;

  return (
    <Box
      _dark={{ bg: "gray.900" }}
      bg="gray.50"
      w="full"
      my={8}
      p={8}
      rounded={16}
      overflow="auto"
      boxShadow="lg"
    >
      {heading && (
        <Heading as="h1" mb={4}>
          Subscribers
        </Heading>
      )}
      <Table variant="striped" {...getTableProps()}>
        <Thead>
          <Tr>
            {headerGroups[0].headers.map((column) => {
              const { key: columnKey, ...restOfColumnProps } =
                column.getHeaderProps();

              return (
                <Th key={columnKey} {...restOfColumnProps}>
                  {column.render("Header")}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {subscribersLoading &&
            ["s1", "s2"].map((row) => (
              <Tr key={row}>
                {headerGroups[0].headers.map((column) => {
                  const { key: columnKey, ...restOfColumnProps } =
                    column.getHeaderProps();

                  return (
                    <Td key={columnKey} {...restOfColumnProps}>
                      <Skeleton>{column.render("Header")}</Skeleton>
                    </Td>
                  );
                })}
              </Tr>
            ))}
          {page.map((row: Row<Subscriber>) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell: Cell<Subscriber>) => {
                  const { key: columnKey, ...restOfColumnProps } =
                    cell.getCellProps();

                  if (cell.column.id === "created_at") {
                    return (
                      <Td key={columnKey} {...restOfColumnProps}>
                        {new Date(row.original.created_at).toLocaleString()}
                      </Td>
                    );
                  }

                  return (
                    <Td key={columnKey} {...restOfColumnProps}>
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Pagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
    </Box>
  );
};
