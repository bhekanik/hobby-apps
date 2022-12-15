import {
  Flex,
  Grid,
  TableCaption,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { Row, usePagination, useSortBy, useTable } from "react-table";
import { useDeals } from "src/hooks";
import { Deal, TableInstanceWithHooks } from "types";
import { InvestorPopoverDealCard } from "../InvestorsTable/InvestorPopoverDealCard";
import { Pagination } from "../Pagination";

interface Props {
  companyId: number;
  companyName?: string;
  dealId?: number;
}

export const CompanyPopoverDealsTable = ({
  companyId,
  dealId,
  companyName,
}: Props) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  const { deals: allDeals } = useDeals();

  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    if (allDeals) {
      const filteredDeals =
        allDeals.filter((d) => d.company.id === companyId && d.id !== dealId) ||
        [];
      setDeals(filteredDeals);
    }
  }, [allDeals, companyId, dealId]);

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
    <Flex
      borderLeft={isLessThan768 ? "none" : "1px solid"}
      pl={4}
      borderColor="gray.200"
      _dark={{
        borderColor: "gray.600",
      }}
      position="relative"
      w="80%"
      flexDir="column"
    >
      <Text mb={2} w="fit-content">
        Deals
      </Text>

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
          <TableCaption>{`No other deals found`}</TableCaption>
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
