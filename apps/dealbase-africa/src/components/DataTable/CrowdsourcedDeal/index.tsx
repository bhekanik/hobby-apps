import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { moneyFormatter } from "formatters";
import { ComponentType, useEffect, useMemo, useState } from "react";
import { Cell, Row, usePagination, useSortBy, useTable } from "react-table";
import { Pagination } from "src/components/DataTable/Pagination";
import { LinkText } from "src/components/LinkText";
import { CrowdsourcedDealsModalProps } from "src/components/Modals/useCrowdsourcedDealsModal";
import { useDeleteAlert } from "src/components/Modals/useDeleteAlert";
import { EntryType } from "src/hooks/useDeleteEntry";
import { useUserPermissions } from "src/hooks/useUserPermissions";
import { CrowdsourcedDeal } from "src/pages/api/crowdsourced_deal";
import { TableInstanceWithHooks } from "types";

interface Props {
  heading?: boolean;
  enableEdit?: boolean;
  CrowdsourcedDealsModal: ComponentType<Partial<CrowdsourcedDealsModalProps>>;
  onCrowdsourcedDealsModalOpen: () => void;
  crowdsourcedDeals: CrowdsourcedDeal[];
  crowdsourcedDealsLoading: boolean;
}

export const CrowdsourcedDealsTable = ({
  CrowdsourcedDealsModal,
  onCrowdsourcedDealsModalOpen,
  crowdsourcedDeals,
  crowdsourcedDealsLoading,
  heading,
  enableEdit,
}: Props) => {
  const { DeleteAlert, onOpen: onDeleteAlertOpen } = useDeleteAlert();

  const [selectedCrowdsourcedDeal, setSelectedCrowdsourcedDeal] = useState<
    CrowdsourcedDeal | undefined
  >();
  const [crowdsourcedDealToDelete, setCrowdsourcedDealToDelete] = useState<
    CrowdsourcedDeal | undefined
  >();
  const { permissions } = useUserPermissions();

  useEffect(() => {
    if (selectedCrowdsourcedDeal) {
      onCrowdsourcedDealsModalOpen();
    }
  }, [selectedCrowdsourcedDeal, onCrowdsourcedDealsModalOpen]);

  useEffect(() => {
    if (crowdsourcedDealToDelete) {
      onDeleteAlertOpen();
    }
  }, [crowdsourcedDealToDelete, onDeleteAlertOpen]);

  const columns = useMemo(
    () => [
      {
        Header: "Company Name",
        accessor: "company_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Press Release",
        accessor: "press_release_link",
      },
      {
        Header: "Sector",
        accessor: "sector",
      },
      {
        Header: "Stage",
        accessor: "stage",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Investor",
        accessor: "investor",
      },
      {
        Header: "Additional Info",
        accessor: "additional_info",
      },
      {
        Header: "Created At",
        accessor: "created_at",
      },
    ],
    []
  );

  const data = useMemo(() => crowdsourcedDeals, [crowdsourcedDeals]);

  const sortBy = useMemo(
    () => [
      {
        id: "created_at",
        desc: true,
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
  ) as TableInstanceWithHooks<CrowdsourcedDeal>;

  return (
    <>
      <CrowdsourcedDealsModal
        crowdsourcedDeal={selectedCrowdsourcedDeal}
        resetSelectedCrowdsourcedDeal={() =>
          setSelectedCrowdsourcedDeal(undefined)
        }
      />

      {crowdsourcedDealToDelete && (
        <DeleteAlert
          entryType={EntryType.Company}
          entry={crowdsourcedDealToDelete}
          resetSelectedEntry={() => setCrowdsourcedDealToDelete(undefined)}
        />
      )}

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
            Crowdsourced Deals
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
              {permissions.includes("edit:crowdsourced_deal") && enableEdit && (
                <Th></Th>
              )}
            </Tr>
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {crowdsourcedDealsLoading &&
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
                  {permissions.includes("edit:crowdsourced_deal") &&
                    enableEdit && (
                      <Td>
                        <Skeleton></Skeleton>
                      </Td>
                    )}
                </Tr>
              ))}
            {page.map((row: Row<CrowdsourcedDeal>) => {
              prepareRow(row);

              const { key, ...restOfRowProps } = row.getRowProps();

              return (
                // eslint-disable-next-line react/jsx-key
                <Tr key={key} {...restOfRowProps}>
                  {row.cells.map((cell: Cell<CrowdsourcedDeal>) => {
                    const { key: cellKey, ...restOfCellProps } =
                      cell.getCellProps();

                    if (cell.column.id === "amount") {
                      return (
                        <Td
                          key={cellKey}
                          {...restOfCellProps}
                          isNumeric
                          whiteSpace="nowrap"
                        >
                          {row.original.amount === 0
                            ? "Undisclosed"
                            : moneyFormatter(row.original.amount)}
                        </Td>
                      );
                    } else if (cell.column.id === "press_release_link") {
                      return (
                        <Td
                          key={cellKey}
                          {...restOfCellProps}
                          whiteSpace="nowrap"
                        >
                          {row.original.press_release_link ? (
                            <LinkText
                              href={row.original.press_release_link}
                              label={
                                row.original.press_release_date
                                  ? new Date(
                                      row.original.press_release_date
                                    ).toLocaleDateString()
                                  : "Undisclosed Date"
                              }
                            />
                          ) : (
                            <>
                              {row.original.press_release_date
                                ? new Date(
                                    row.original.press_release_date
                                  ).toLocaleDateString()
                                : "Undisclosed"}
                            </>
                          )}
                        </Td>
                      );
                    }

                    return (
                      // eslint-disable-next-line react/jsx-key
                      <Td key={cellKey} {...restOfCellProps}>
                        {cell.render("Cell")}
                      </Td>
                    );
                  })}

                  {permissions.includes("edit:crowdsourced_deals") &&
                    enableEdit && (
                      <Td>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<HamburgerIcon />}
                            variant="outline"
                          />
                          <MenuList>
                            <MenuItem
                              onClick={() =>
                                setSelectedCrowdsourcedDeal(row.original)
                              }
                              icon={<EditIcon />}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                setCrowdsourcedDealToDelete(row.original)
                              }
                              icon={<DeleteIcon />}
                            >
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    )}
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
    </>
  );
};
