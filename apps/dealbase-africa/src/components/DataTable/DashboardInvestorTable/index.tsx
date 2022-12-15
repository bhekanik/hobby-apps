import {
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ComponentType, useEffect, useMemo, useState } from "react";
import { Cell, Row, usePagination, useSortBy, useTable } from "react-table";
import { CloudinaryImage } from "shared-components";
import { InvestorPopover } from "src/components/DataTable/InvestorsTable/InvestorPopover";
import { Pagination } from "src/components/DataTable/Pagination";
import { useDeleteAlert } from "src/components/Modals/useDeleteAlert";
import { InvestorsModalProps } from "src/components/Modals/useInvestorsModal";
import { EntryType } from "src/hooks/useDeleteEntry";
import { useUserPermissions } from "src/hooks/useUserPermissions";
import { Investor, TableInstanceWithHooks } from "types";

interface Props {
  heading?: boolean;
  enableEdit?: boolean;
  InvestorsModal: ComponentType<Partial<InvestorsModalProps>>;
  onInvestorsModalOpen: () => void;
  investors: Investor[];
  investorsLoading: boolean;
}

export const DashboardInvestorTable = ({
  InvestorsModal,
  onInvestorsModalOpen,
  investors,
  investorsLoading,
  heading,
  enableEdit,
}: Props) => {
  const {
    DeleteAlert,
    onOpen: onDeleteAlertOpen,
    isOpen: isDeleteAlertOpen,
  } = useDeleteAlert();

  const [selectedInvestor, setSelectedInvestor] = useState<
    Investor | undefined
  >();
  const [investorToDelete, setInvestorToDelete] = useState<
    Investor | undefined
  >();
  const { permissions } = useUserPermissions();

  useEffect(() => {
    if (!isDeleteAlertOpen) {
      setInvestorToDelete(undefined);
    }
  }, [isDeleteAlertOpen]);

  useEffect(() => {
    if (selectedInvestor) {
      onInvestorsModalOpen();
    }
  }, [selectedInvestor, onInvestorsModalOpen]);

  useEffect(() => {
    if (investorToDelete) {
      onDeleteAlertOpen();
    }
  }, [investorToDelete, onDeleteAlertOpen]);

  const columns = useMemo(
    () => [
      {
        Header: "name",
        accessor: "name",
      },
      {
        Header: "Website",
        accessor: "website",
      },
      {
        Header: "Created At",
        accessor: "created_at",
      },
    ],
    []
  );

  const data = useMemo(() => investors, [investors]);

  const sortBy = useMemo(
    () => [
      {
        id: "name",
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
  ) as TableInstanceWithHooks<Investor>;

  return (
    <>
      <InvestorsModal
        investor={selectedInvestor}
        resetSelectedInvestor={() => setSelectedInvestor(undefined)}
      />

      {isDeleteAlertOpen && investorToDelete && (
        <DeleteAlert entryType={EntryType.Investor} entry={investorToDelete} />
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
            Investors
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
              {permissions.includes("edit:investors") && enableEdit && (
                <Th></Th>
              )}
            </Tr>
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {investorsLoading &&
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
                  {permissions.includes("edit:investors") && enableEdit && (
                    <Th></Th>
                  )}
                </Tr>
              ))}

            {page.map((row: Row<Investor>) => {
              prepareRow(row);
              const { key, ...restOfRowProps } = row.getRowProps();
              return (
                <Tr key={key} {...restOfRowProps}>
                  {row.cells.map((cell: Cell<Investor>) => {
                    const { key: columnKey, ...restOfColumnProps } =
                      cell.getCellProps();
                    if (cell.column.id === "name") {
                      return (
                        <Td
                          key={columnKey}
                          {...restOfColumnProps}
                          isNumeric
                          whiteSpace="nowrap"
                        >
                          <InvestorPopover
                            investor={row.original}
                            enableEdit={enableEdit}
                            onInvestorsModalOpen={onInvestorsModalOpen}
                            onDeleteAlertOpen={onDeleteAlertOpen}
                            trigger={
                              <Flex alignItems="center">
                                {row.original.logo?.cloudinary_public_id && (
                                  <CloudinaryImage
                                    publicId={
                                      row.original.logo.cloudinary_public_id
                                    }
                                    imageWidth={32}
                                    alt="Logo"
                                  />
                                )}
                                <Text
                                  color="teal.500"
                                  _dark={{
                                    color: "teal.100",
                                  }}
                                >
                                  {row.original.name}
                                </Text>
                              </Flex>
                            }
                          />
                        </Td>
                      );
                    } else if (cell.column.id === "website") {
                      return (
                        <Td key={columnKey} {...restOfColumnProps}>
                          <Link
                            display="flex"
                            gap={2}
                            alignItems="center"
                            color="teal.500"
                            _dark={{
                              color: "teal.100",
                            }}
                            target="_blank"
                            href={row.original.website}
                          >
                            {cell.render("Cell")}
                            <ExternalLinkIcon w={3} h={3} />
                          </Link>
                        </Td>
                      );
                    } else if (cell.column.id === "created_at") {
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

                  {permissions.includes("edit:deals") && enableEdit && (
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
                            onClick={() => setSelectedInvestor(row.original)}
                            icon={<EditIcon />}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => setInvestorToDelete(row.original)}
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
