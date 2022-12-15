import {
  Flex,
  Grid,
  TableCaption,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { Row, usePagination, useSortBy, useTable } from "react-table";
import { Pagination } from "src/components/DataTable/Pagination";
import { useDealsByInvestor } from "src/hooks/useDealsByInvestor";
import { Deal, TableInstanceWithHooks } from "types";
import { InvestorPopoverDealCard } from "./InvestorPopoverDealCard";

interface Props {
  investorName: string;
}

export const InvestorPopoverDealGrid = ({ investorName }: Props) => {
  const deals = useDealsByInvestor(investorName);

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

  const data = useMemo(() => deals ?? [], [deals]);

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
      initialState: { pageIndex: 0, sortBy, pageSize: 5 },
    },
    useSortBy,
    usePagination
  ) as TableInstanceWithHooks<Deal>;

  return (
    <Flex flexDir="column" gap={2}>
      <Text w="fit-content">{`All Deals: ${data.length ?? 0}`}</Text>
      <Grid
        templateColumns={
          isLessThan768
            ? "repeat(auto-fit, minmax(250px, 1fr))"
            : "repeat(auto-fit, minmax(350px, 1fr))"
        }
        w={isLessThan768 ? "100%" : "50%"}
        gap={2}
      >
        {deals.length === 0 && (
          <TableCaption>{`No deals found for ${investorName}`}</TableCaption>
        )}
        {page.map((row: Row<Deal>) => {
          prepareRow(row);
          const { key, ...restOfRowProps } = row.getRowProps();
          return (
            <InvestorPopoverDealCard
              deal={row.original}
              key={key}
              {...restOfRowProps}
            />
          );
        })}
      </Grid>

      <Pagination
        w="50%"
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
        showPageSizeOptions={false}
        showGotoPage={false}
        pageLabel={`${pageIndex + 1} of ${pageCount}`}
      />
    </Flex>
  );
};
