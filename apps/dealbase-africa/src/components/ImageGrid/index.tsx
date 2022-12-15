import { Flex, Grid, Text, useMediaQuery } from "@chakra-ui/react";
import { useMemo } from "react";
import { Row, usePagination, useSortBy, useTable } from "react-table";
import { Pagination } from "src/components/DataTable/Pagination";
import { useLogos } from "src/hooks/useLogos";
import { Logo, TableInstanceWithHooks } from "types";
import { ImageCard } from "../Gallery/ImageCard";

export const ImageGrid = () => {
  const { logos } = useLogos();

  const data = useMemo(() => logos ?? [], [logos]);

  const columns = useMemo(
    () => [
      {
        Header: "URL",
        accessor: "url",
      },
      {
        Header: "Format",
        accessor: "format",
      },
      {
        Header: "Original File Name",
        accessor: "original_filename",
      },
    ],
    []
  );

  const {
    getTableProps,
    prepareRow,
    page,
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
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  ) as TableInstanceWithHooks<Logo>;

  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  return (
    <Flex flexDir="column">
      <Text>Images</Text>

      <Grid
        templateColumns={
          isLessThan768
            ? "repeat(auto-fit, minmax(300px, 1fr))"
            : "repeat(auto-fit, minmax(200px, 1fr))"
        }
        gap={6}
        mt={4}
        {...getTableProps()}
      >
        {page
          ?.sort((a, b) =>
            (a.original.original_filename || "").localeCompare(
              b.original.original_filename || ""
            )
          )
          .map((row: Row<Logo>) => {
            prepareRow(row);
            const { key, ...restOfRowProps } = row.getRowProps();

            return (
              <ImageCard
                key={key}
                image={row.original}
                d="flex"
                flexDir="column"
                alignItems="center"
                position="relative"
                {...restOfRowProps}
              />
            );
          })}
      </Grid>

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
    </Flex>
  );
};
