import {
  ArrowDownIcon,
  ArrowUpIcon,
  DeleteIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Text,
  Th,
  Tr,
  useMediaQuery,
} from "@chakra-ui/react";
import { moneyFormatter } from "formatters";
import { VscInfo } from "react-icons/vsc";
import { Cell, Row } from "react-table";
import { CloudinaryImage } from "shared-components";
import { InvestorPopover } from "src/components/DataTable/InvestorsTable/InvestorPopover";
import { TableBase } from "src/components/DataTable/TableBase";
import { TableDataProps } from "src/components/DataTable/types";
import { useDeleteAlert } from "src/components/Modals/useDeleteAlert";
import { EntryType } from "src/hooks/useDeleteEntry";
import { InvestorWithDeals } from "src/hooks/useFilteredInvestors";
import { useUserPermissions } from "src/hooks/useUserPermissions";

export const InvestorTable = <T extends InvestorWithDeals = InvestorWithDeals>({
  enableEdit,
  getTableProps,
  headers,
  prepareRow,
  page,
  loading,
  headerGroups,
  getTableBodyProps,
}: TableDataProps<T> & BoxProps) => {
  const { permissions } = useUserPermissions();

  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  const {
    DeleteAlert,
    onOpen: onDeleteAlertOpen,
    isOpen: isDeleteAlertOpen,
  } = useDeleteAlert();

  return (
    <TableBase
      loading={loading}
      getTableBodyProps={getTableBodyProps}
      headerGroups={headerGroups}
      getTableProps={getTableProps}
      headerRow={headers.map((column) => {
        const { key: columnKey, ...restOfColumnProps } = column.getHeaderProps(
          column.getSortByToggleProps()
        );
        if (column.id === "minDealValue" || column.id === "maxDealValue") {
          return (
            <Th isNumeric key={columnKey} {...restOfColumnProps}>
              <Flex gap={1} p={0} m={0} justifyContent="flex-end">
                <Text align="right">{column.render("Header")}</Text>
                <span>
                  {page.length > 1 && column.isSorted ? (
                    column.isSortedDesc ? (
                      <ArrowDownIcon />
                    ) : (
                      <ArrowUpIcon />
                    )
                  ) : (
                    ""
                  )}
                </span>
              </Flex>
            </Th>
          );
        }

        if (column.id === "website") {
          return null;
        }

        return (
          <Th key={columnKey} {...restOfColumnProps}>
            <Flex gap={1}>
              <Text>{column.render("Header")}</Text>
              <span>
                {page.length > 1 && column.isSorted ? (
                  column.isSortedDesc ? (
                    <ArrowDownIcon />
                  ) : (
                    <ArrowUpIcon />
                  )
                ) : (
                  ""
                )}
              </span>
            </Flex>
          </Th>
        );
      })}
      rows={page.map((row: Row<T>) => {
        prepareRow(row);
        const { key, ...restOfRowProps } = row.getRowProps();

        return (
          <Tr key={key} {...restOfRowProps}>
            {isDeleteAlertOpen && DeleteAlert && (
              <DeleteAlert
                entryType={EntryType.Investor}
                entry={row.original}
              />
            )}

            {row.cells.map((cell: Cell<T>) => {
              const { key: cellKey, ...restOfCellProps } = cell.getCellProps();
              if (cell.column.id === "name") {
                return (
                  <Td key={cellKey} {...restOfCellProps}>
                    <InvestorPopover
                      onInvestorsModalOpen={() => null}
                      onDeleteAlertOpen={() => null}
                      investor={row.original}
                      trigger={
                        <Box>
                          <Flex gap={4} alignItems="flex-start">
                            {row.original.logo?.cloudinary_public_id && (
                              <CloudinaryImage
                                publicId={
                                  row.original.logo.cloudinary_public_id
                                }
                                d="flex"
                                alignItems="center"
                                justifyContent="center"
                                imageWidth={isLessThan768 ? 96 : 72}
                                // imageHeight={72}
                                minW={isLessThan768 ? "100px" : "70px"}
                                minH={isLessThan768 ? "100px" : "70px"}
                                bg="white"
                                p={0}
                                alt={`${row.original.name} Logo`}
                                border="1px solid"
                                borderColor="gray.500"
                                _dark={{
                                  borderColor: "gray.300",
                                }}
                              />
                            )}

                            <Flex
                              w="full"
                              flexDir={isLessThan768 ? "column" : "row"}
                              gap={2}
                            >
                              <Flex
                                flexDir="column"
                                justifyContent="center"
                                h="full"
                                w="full"
                              >
                                <Flex
                                  justifyContent={
                                    isLessThan768 ? "space-between" : ""
                                  }
                                  w="full"
                                  gap={2}
                                  alignItems="center"
                                >
                                  <Heading size="md">
                                    {row.original.name}
                                  </Heading>
                                  <Icon as={VscInfo} fontSize={18} />
                                </Flex>
                                <Text align="left">{`Number of Deals: ${
                                  row.original.allDeals ?? 0
                                }`}</Text>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Box>
                      }
                    />
                  </Td>
                );
              } else if (cell.column.id === "minDealValue") {
                return (
                  <Td
                    isNumeric
                    key={cellKey}
                    {...restOfCellProps}
                    whiteSpace="nowrap"
                  >
                    {row.original.minDealValue === 0
                      ? "-"
                      : row.original.minDealValue === Infinity
                      ? "-"
                      : moneyFormatter(row.original.minDealValue ?? 0, {
                          notation: "standard",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                  </Td>
                );
              } else if (cell.column.id === "maxDealValue") {
                return (
                  <Td
                    isNumeric
                    key={cellKey}
                    {...restOfCellProps}
                    whiteSpace="nowrap"
                  >
                    {row.original.maxDealValue === 0
                      ? "-"
                      : row.original.minDealValue === Infinity
                      ? "-"
                      : moneyFormatter(row.original.maxDealValue ?? 0, {
                          notation: "standard",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                  </Td>
                );
              }

              if (cell.column.id === "website") {
                return null;
              }

              return (
                <Td key={cellKey} {...restOfCellProps}>
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
                    <MenuItem onClick={onDeleteAlertOpen} icon={<DeleteIcon />}>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            )}
          </Tr>
        );
      })}
    />
  );
};
