import {
  ArrowDownIcon,
  ArrowUpIcon,
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  Flex,
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
import { countryList } from "fixtures";
import { moneyFormatter } from "formatters";
import { VscInfo } from "react-icons/vsc";
import { Cell, Row } from "react-table";
import { CloudinaryImage } from "shared-components";
import { TableBase } from "src/components/DataTable/TableBase";
import { TableDataProps } from "src/components/DataTable/types";
import { LinkText } from "src/components/LinkText";
import { useEditDealModal } from "src/components/Modals/Deals/useEditDealModal";
import { useDeleteAlert } from "src/components/Modals/useDeleteAlert";
import { CompanyPopover } from "src/components/Popover/CompanyPopover";
import { EntryType } from "src/hooks/useDeleteEntry";
import { useUserPermissions } from "src/hooks/useUserPermissions";
import { Deal } from "types";

export const DealTable = <T extends Deal = Deal>({
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
    EditDealModal,
    isOpen: isEditDealModalOpen,
    onOpen: onEditDealModalOpen,
  } = useEditDealModal();

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
        if (column.id === "amount") {
          return (
            <Th isNumeric key={columnKey} {...restOfColumnProps}>
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
        }

        if (column.id === "press_release.date") {
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
        const rowProps = row.getRowProps?.();

        prepareRow(row);

        return (
          <Tr key={rowProps?.key}>
            {isEditDealModalOpen && EditDealModal && (
              <EditDealModal deal={row.original} />
            )}

            {isDeleteAlertOpen && DeleteAlert && (
              <DeleteAlert entryType={EntryType.Deal} entry={row.original} />
            )}

            {row.cells.map((cell: Cell<T>) => {
              const { key: cellKey, ...restOfCellProps } = cell.getCellProps();

              if (cell.column.id === "company.name") {
                return (
                  <Td key={cellKey} {...restOfCellProps}>
                    <CompanyPopover
                      dealId={row.original.id}
                      company={row.original.company}
                      trigger={
                        <Box>
                          <Flex gap={4} alignItems="flex-start">
                            {row.original.company.logo
                              ?.cloudinary_public_id && (
                              <CloudinaryImage
                                publicId={
                                  row.original.company.logo.cloudinary_public_id
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
                                alt={`${row.original.company.name} Logo`}
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
                                  <LinkText
                                    fontWeight="bold"
                                    fontSize="lg"
                                    href={row.original.company.website}
                                    size="md"
                                    label={row.original.company.name}
                                    tooltip="Click to view company website"
                                  />

                                  {/* <Heading size="md">
                                    {row.original.company.name}
                                  </Heading> */}
                                  <Icon as={VscInfo} fontSize={18} />
                                </Flex>
                                <Text align="left" m={0}>
                                  {row.original.company.sector.includes("[")
                                    ? JSON.parse(
                                        row.original.company.sector
                                      ).join(",")
                                    : row.original.company.sector}
                                </Text>
                                <Text align="left" m={0}>
                                  {
                                    countryList.find(
                                      (item) =>
                                        item.code ===
                                        row.original.company.country
                                    )?.name
                                  }
                                </Text>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Box>
                      }
                    />
                  </Td>
                );
              } else if (cell.column.id === "company.country") {
                return (
                  <Td key={cellKey} {...restOfCellProps}>
                    {
                      countryList.find(
                        (country) =>
                          country.code === row.original.company.country
                      )?.name
                    }
                  </Td>
                );
              } else if (cell.column.id === "amount") {
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
              } else if (cell.column.id === "press_release.date") {
                return (
                  <Td key={cellKey} {...restOfCellProps} whiteSpace="nowrap">
                    {row.original.press_release?.link ? (
                      <LinkText
                        href={row.original.press_release?.link}
                        label={
                          row.original.press_release?.date
                            ? new Date(
                                row.original.press_release?.date
                              ).toLocaleDateString()
                            : "Undisclosed Date"
                        }
                      />
                    ) : (
                      <>
                        {row.original.press_release?.date
                          ? new Date(
                              row.original.press_release?.date
                            ).toLocaleDateString()
                          : "Undisclosed"}
                      </>
                    )}
                  </Td>
                );
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
                    <MenuItem onClick={onEditDealModalOpen} icon={<EditIcon />}>
                      Edit
                    </MenuItem>
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
