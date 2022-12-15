import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
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
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { countryList } from "fixtures";
import { ComponentType, useEffect, useMemo, useState } from "react";
import { Cell, Row, usePagination, useSortBy, useTable } from "react-table";
import { CloudinaryImage } from "shared-components";
import { Pagination } from "src/components/DataTable/Pagination";
import { CompanyModalProps } from "src/components/Modals/useCompanyModal";
import { useDeleteAlert } from "src/components/Modals/useDeleteAlert";
import { CompanyPopover } from "src/components/Popover/CompanyPopover";
import { EntryType } from "src/hooks/useDeleteEntry";
import { useUserPermissions } from "src/hooks/useUserPermissions";
import { Company, TableInstanceWithHooks } from "types";

interface Props {
  heading?: boolean;
  enableEdit?: boolean;
  CompaniesModal: ComponentType<Partial<CompanyModalProps>>;
  onCompaniesModalOpen: () => void;
  companies: Company[];
  companiesLoading: boolean;
}

export const CompaniesTable = ({
  CompaniesModal,
  onCompaniesModalOpen,
  companies,
  companiesLoading,
  heading,
  enableEdit,
}: Props) => {
  const {
    DeleteAlert,
    onOpen: onDeleteAlertOpen,
    isOpen: isDeleteAlertOpen,
  } = useDeleteAlert();

  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>();
  const [companyToDelete, setCompanyToDelete] = useState<Company | undefined>();
  const { permissions } = useUserPermissions();

  useEffect(() => {
    if (!isDeleteAlertOpen) {
      setCompanyToDelete(undefined);
    }
  }, [isDeleteAlertOpen]);

  useEffect(() => {
    if (selectedCompany) {
      onCompaniesModalOpen();
    }
  }, [selectedCompany, onCompaniesModalOpen]);

  useEffect(() => {
    if (companyToDelete) {
      onDeleteAlertOpen();
    }
  }, [companyToDelete, onDeleteAlertOpen]);

  const columns = useMemo(
    () => [
      {
        Header: "name",
        accessor: "name",
      },
      {
        Header: "Country",
        accessor: "country",
      },
      {
        Header: "Created At",
        accessor: "created_at",
      },
    ],
    []
  );

  const data = useMemo(() => companies, [companies]);

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
  ) as TableInstanceWithHooks<Company>;

  return (
    <>
      <CompaniesModal
        company={selectedCompany}
        resetSelectedCompany={() => setSelectedCompany(undefined)}
      />

      {isDeleteAlertOpen && companyToDelete && (
        <DeleteAlert
          entryType={EntryType.Company}
          entry={companyToDelete}
          resetSelectedEntry={() => setCompanyToDelete(undefined)}
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
            Companies
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
              {permissions.includes("edit:companies") && enableEdit && (
                <Th></Th>
              )}
            </Tr>
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {companiesLoading &&
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
                  {permissions.includes("edit:companies") && enableEdit && (
                    <Th>
                      <Skeleton></Skeleton>
                    </Th>
                  )}
                </Tr>
              ))}

            {page.map((row: Row<Company>) => {
              prepareRow(row);
              const { key, ...restOfRowProps } = row.getRowProps();
              return (
                <Tr key={key} {...restOfRowProps}>
                  {row.cells.map((cell: Cell<Company>) => {
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
                          <CompanyPopover
                            company={row.original}
                            dealId={row.original.id}
                            trigger={
                              <Flex alignItems="center" gap={2}>
                                {row.original.logo?.cloudinary_public_id && (
                                  <CloudinaryImage
                                    publicId={
                                      row.original.logo.cloudinary_public_id
                                    }
                                    imageWidth={32}
                                    alt="Logo"
                                    d="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    bg="white"
                                    crop="scale"
                                    p={0}
                                    border="1px solid"
                                    borderColor="gray.500"
                                    _dark={{
                                      borderColor: "gray.300",
                                    }}
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
                    } else if (cell.column.id === "country") {
                      return (
                        <Td key={columnKey} {...restOfColumnProps}>
                          {
                            countryList.find(
                              (item) => item.code === row.original.country
                            )?.name
                          }
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

                  {permissions.includes("edit:companies") && enableEdit && (
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
                            onClick={() => setSelectedCompany(row.original)}
                            icon={<EditIcon />}
                          >
                            Edit
                          </MenuItem>

                          {permissions.includes("delete:companies") &&
                            enableEdit && (
                              <MenuItem
                                disabled
                                onClick={() => setCompanyToDelete(row.original)}
                                icon={<DeleteIcon />}
                              >
                                Delete
                              </MenuItem>
                            )}
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
