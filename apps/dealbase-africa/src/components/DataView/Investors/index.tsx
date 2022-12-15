import { Box, BoxProps, Flex, useMediaQuery } from "@chakra-ui/react";
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
import { InvestorTable } from "src/components/DataTable/InvestorTable";
import { Pagination } from "src/components/DataTable/Pagination";
import { TableDataProps } from "src/components/DataTable/types";
import { DataViewHeader } from "src/components/DataView/DataViewHeader";
import { InvestorCard } from "src/components/DataView/Investors/InvestorCard";
import { Loader } from "src/components/Loader";
import {
  InvestorWithDeals,
  useFilteredInvestors,
} from "src/hooks/useFilteredInvestors";
import { DataViewType, Investor, TableInstanceWithHooks } from "types";

interface Props {
  heading?: boolean;
  enableEdit?: boolean;
  investorsLoading?: boolean;
}

const InvestorsDataViewBase = (
  { heading, enableEdit, ...otherProps }: Props & BoxProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { filteredInvestors, isFetched, investorsLoading } =
    useFilteredInvestors();

  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Website",
        accessor: "website",
      },
      {
        Header: "Min Deal Value",
        accessor: "minDealValue",
      },
      {
        Header: "Max Deal Value",
        accessor: "maxDealValue",
      },
      {
        Header: "Stages",
        accessor: "stageCounts",
      },
      {
        Header: "Sectors",
        accessor: "sectorCounts",
      },
      {
        Header: "Number of Deals",
        accessor: "numberOfDealsInPeriod",
      },
    ],
    []
  );

  const data = useMemo(
    () => filteredInvestors.filter((i) => i.name !== "Undisclosed") ?? [],
    [filteredInvestors]
  );

  const sortBy = useMemo(
    () => [
      {
        id: "numberOfDealsInPeriod",
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
  ) as TableInstanceWithHooks<Investor>;

  const [dataViewType, setDataViewType] = useState<DataViewType>("grid");

  if (isFetched && investorsLoading)
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
        <DataViewHeader heading={heading ? "Investors" : ""} />

        {(dataViewType === "grid" || isLessThan768) && (
          <DataGrid<InvestorWithDeals>
            renderCard={(props: CardProps<InvestorWithDeals>) => (
              <InvestorCard {...props} />
            )}
            noSort={columns
              .map((c) => c.accessor)
              .filter(
                (c) =>
                  ![
                    "name",
                    "minDealValue",
                    "maxDealValue",
                    "numberOfDealsInPeriod",
                  ].includes(c)
              )}
            enableEdit={enableEdit}
            onChangeDataViewType={setDataViewType}
            dataViewType={dataViewType}
            getTableProps={getTableProps}
            headers={
              headers as (ColumnInstance<InvestorWithDeals> &
                UseSortByColumnProps<InvestorWithDeals>)[]
            }
            prepareRow={prepareRow}
            page={page}
            setSortBy={setSortBy}
            defaultSortBy={sortBy[0]}
          />
        )}

        {dataViewType === "table" && !isLessThan768 && (
          <DataTable<InvestorWithDeals>
            renderTableData={(props: TableDataProps<InvestorWithDeals>) => (
              <InvestorTable {...props} />
            )}
            setSortBy={setSortBy}
            defaultSortBy={sortBy[0]}
            heading={heading}
            enableEdit={enableEdit}
            onChangeDataViewType={setDataViewType}
            dataViewType={dataViewType}
            getTableProps={getTableProps}
            loading={investorsLoading}
            headerGroups={headerGroups}
            getTableBodyProps={getTableBodyProps}
            headers={
              headers as (ColumnInstance<InvestorWithDeals> &
                UseSortByColumnProps<InvestorWithDeals>)[]
            }
            prepareRow={prepareRow}
            page={page}
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

export const InvestorsDataView = forwardRef(InvestorsDataViewBase);
