import { Box, BoxProps, Button, Flex, useMediaQuery } from "@chakra-ui/react";
import React, { forwardRef, useMemo, useState } from "react";
import {
  ColumnInstance,
  usePagination,
  useSortBy,
  UseSortByColumnProps,
  useTable,
} from "react-table";
import { CardProps, DataGrid } from "src/components/DataGrid";
import { DataTable } from "src/components/DataTable";
import { DealTable } from "src/components/DataTable/DealTable";
import { Pagination } from "src/components/DataTable/Pagination";
import { TableDataProps } from "src/components/DataTable/types";
import { DataViewHeader } from "src/components/DataView/DataViewHeader";
import { DealCard } from "src/components/DataView/DealCard";
import { Loader } from "src/components/Loader";
import { useSubmitDealModal } from "src/components/Modals/Deals/useSubmitDealModal";
import { useFilteredDeals } from "src/hooks/useFilteredDeals";
import { DataViewType, Deal, TableInstanceWithHooks } from "types";

interface Props {
  heading?: boolean;
  enableEdit?: boolean;
}

const DealDataViewBase = (
  { heading, enableEdit, ...otherProps }: Props & BoxProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { filteredDeals, isFetched, dealsLoading } = useFilteredDeals();
  console.log("filteredDeals:", filteredDeals);

  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  const columns = useMemo(
    () => [
      {
        Header: "Company",
        accessor: "company.name",
      },
      {
        Header: "Country",
        accessor: "company.country",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Stage",
        accessor: "stage",
      },
      {
        Header: "Investors",
        accessor: (row: Deal) => (row.investors as string[]).join(", "),
        id: "investors",
      },
      {
        Header: "Press Release",
        accessor: "press_release.date",
      },
    ],
    []
  );

  const data = useMemo(() => filteredDeals ?? [], [filteredDeals]);

  const sortBy = useMemo(
    () => [
      {
        id: "press_release.date",
        desc: true,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    headers,
    setSortBy,
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
  ) as TableInstanceWithHooks<Deal>;

  const [dataViewType, setDataViewType] = useState<DataViewType>("grid");

  const { SubmitDealModal, onOpen, isOpen } = useSubmitDealModal();

  if (!isFetched || dealsLoading)
    return (
      <Loader
        position="absolute"
        top="0"
        bottom="0"
        right="0"
        left="0"
        zIndex="overlay"
      />
    );

  return (
    <Box ref={ref} {...otherProps} w="full">
      <Flex
        flexDir="column"
        _dark={{ bg: "gray.900" }}
        bg="gray.100"
        w="full"
        mb={8}
        p={isLessThan768 ? 4 : 8}
        rounded={16}
        overflow="auto"
        boxShadow="lg"
      >
        {isOpen && <SubmitDealModal />}

        <DataViewHeader heading={heading ? "Deals" : ""} />

        {(dataViewType === "grid" || isLessThan768) && (
          <DataGrid<Deal>
            renderCard={(props: CardProps<Deal>) => <DealCard {...props} />}
            actions={
              <Button
                onClick={onOpen}
                colorScheme="green"
                variant="solid"
                size="sm"
                minW="fit-content"
              >
                Submit a deal
              </Button>
            }
            onChangeDataViewType={setDataViewType}
            dataViewType={dataViewType}
            enableEdit={enableEdit}
            getTableProps={getTableProps}
            headers={
              headers as (ColumnInstance<Deal> & UseSortByColumnProps<Deal>)[]
            }
            prepareRow={prepareRow}
            page={page}
            setSortBy={setSortBy}
            defaultSortBy={sortBy[0]}
          />
        )}

        {dataViewType === "table" && !isLessThan768 && (
          <DataTable<Deal>
            renderTableData={(props: TableDataProps<Deal>) => (
              <DealTable {...props} />
            )}
            actions={
              <Button
                onClick={onOpen}
                colorScheme="green"
                variant="solid"
                size="sm"
                minW="fit-content"
              >
                Submit a deal
              </Button>
            }
            dataViewType={dataViewType}
            enableEdit={enableEdit}
            onChangeDataViewType={setDataViewType}
            getTableProps={getTableProps}
            headers={
              headers as (ColumnInstance<Deal> & UseSortByColumnProps<Deal>)[]
            }
            prepareRow={prepareRow}
            page={page}
            setSortBy={setSortBy}
            defaultSortBy={sortBy[0]}
            heading={heading}
            loading={dealsLoading}
            headerGroups={headerGroups}
            getTableBodyProps={getTableBodyProps}
          />
        )}
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
    </Box>
  );
};

export const DealDataView = forwardRef(DealDataViewBase);
