import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { countryList } from "fixtures";
import { moneyFormatter } from "formatters";
import React, { memo } from "react";
import { VscInfo } from "react-icons/vsc";
import { Cell } from "react-table";
import { CloudinaryImage } from "shared-components";
import { CardProps } from "src/components/DataGrid";
import { Card } from "src/components/DataGrid/Card";
import { LinkText } from "src/components/LinkText";
import { useEditDealModal } from "src/components/Modals/Deals/useEditDealModal";
import { useDeleteAlert } from "src/components/Modals/useDeleteAlert";
import { CompanyPopover } from "src/components/Popover/CompanyPopover";
import { EntryType } from "src/hooks/useDeleteEntry";
import { useUserPermissions } from "src/hooks/useUserPermissions";
import { Deal } from "types";

const DealCardBase = ({ enableEdit, row, rowProps }: CardProps<Deal>) => {
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
    <Card rowProps={rowProps}>
      {isEditDealModalOpen && EditDealModal && (
        <EditDealModal deal={row.original} />
      )}

      {isDeleteAlertOpen && DeleteAlert && (
        <DeleteAlert entryType={EntryType.Deal} entry={row.original} />
      )}

      {row.cells.map((cell: Cell<Deal>) => {
        const { key: columnKey, ...restOfColumnProps } = cell.getCellProps();
        if (cell.column.id === "company.name") {
          return (
            <CompanyPopover
              key={columnKey}
              dealId={row.original.id}
              company={row.original.company}
              trigger={
                <Box key={columnKey} {...restOfColumnProps}>
                  <Flex gap={4} alignItems="flex-start">
                    {row.original.company.logo?.cloudinary_public_id && (
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
                          // justifyContent={isLessThan768 ? "space-between" : ""}
                          gap={2}
                          w="full"
                          alignItems="flex-start"
                        >
                          <Text
                            fontWeight="bold"
                            fontSize={18}
                            align="left"
                            size="md"
                          >
                            {row.original.company.name}
                          </Text>
                          <Icon mt={1.5} as={VscInfo} fontSize={18} />
                        </Flex>
                        <Text align="left" m={0}>
                          {row.original.company.sector.includes("[")
                            ? JSON.parse(row.original.company.sector).join(",")
                            : row.original.company.sector}
                        </Text>
                        <Text align="left" m={0}>
                          {
                            countryList.find(
                              (item) =>
                                item.code === row.original.company.country
                            )?.name
                          }
                        </Text>
                      </Flex>

                      <Text
                        w="full"
                        align={isLessThan768 ? "initial" : "right"}
                        fontWeight="bold"
                        fontSize={24}
                      >
                        {row.original.amount === 0
                          ? "Undisclosed"
                          : moneyFormatter(row.original.amount, {
                              notation: "standard",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                      </Text>
                    </Flex>
                  </Flex>
                  <Divider mt={2} />
                </Box>
              }
            />
          );
        } else if (
          cell.column.id === "company.name" ||
          cell.column.id === "company.country" ||
          cell.column.id === "amount"
        ) {
          return null;
        } else if (cell.column.id === "press_release.date") {
          return (
            <React.Fragment key={columnKey}>
              <Flex
                key={columnKey}
                {...restOfColumnProps}
                alignItems="end"
                justifyContent="space-between"
                gap={4}
                w="full"
                borderBottom="1px solid"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="gray.300"
                mt={2}
                px={2}
              >
                <Text w="fit-content">{"Press Release Date"}</Text>
                <Text align="right" maxW="100px">
                  {row.original.press_release?.date
                    ? new Date(
                        row.original.press_release?.date
                      ).toLocaleDateString()
                    : "Undisclosed"}
                </Text>
              </Flex>
              <Divider mt={4} flex={1}></Divider>
              <Flex
                {...restOfColumnProps}
                justifyContent="flex-end"
                mt={4}
                mb={2}
                mx={2}
                gap={4}
                alignItems="center"
              >
                {row.original.press_release?.link ? (
                  <LinkText
                    href={row.original.press_release?.link}
                    label={"Go to press release"}
                    color="white"
                    paddingInlineEnd={3}
                    paddingInlineStart={3}
                    role="button"
                    height={8}
                    outline="2px solid"
                    outlineColor="transparent"
                    outlineOffset="2px"
                    lineHeight="1.2"
                    _hover={{
                      bg: "#01855c",
                      textDecoration: "none",
                      color: "white",
                    }}
                    bg="green.500"
                    _dark={{
                      _hover: {
                        bg: "#49d394",
                        color: "gray.800",
                      },
                      bg: "green.200",
                      color: "gray.800",
                    }}
                    borderRadius="md"
                    transitionProperty="common"
                    transitionDuration="normal"
                    fontSize="sm"
                  />
                ) : (
                  <Text>
                    {row.original.press_release?.date
                      ? new Date(
                          row.original.press_release?.date
                        ).toLocaleDateString()
                      : "Undisclosed"}
                  </Text>
                )}
              </Flex>
            </React.Fragment>
          );
        } else if (cell.column.id === "stage") {
          return (
            <Flex
              key={columnKey}
              {...restOfColumnProps}
              alignItems="end"
              justifyContent="space-between"
              gap={4}
              w="full"
              borderBottom="1px solid"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="gray.300"
              mt={2}
              px={2}
            >
              <Text w="fit-content">{cell.column.Header}</Text>
              <Text align="right" maxW="100px">
                {cell.render("Cell")}
              </Text>
            </Flex>
          );
        }

        return (
          <Flex
            key={columnKey}
            {...restOfColumnProps}
            alignItems="flex-start"
            gap={4}
            w="full"
            mt={2}
            px={2}
            borderBottom="1px solid"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="gray.300"
          >
            <Text>{cell.column.Header}</Text>
            <Text align="right" w="full" mt={0}>
              {cell.render("Cell")}
            </Text>
          </Flex>
        );
      })}

      {permissions.includes("edit:deals") && enableEdit && (
        <Box>
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
        </Box>
      )}
    </Card>
  );
};

export const DealCard = memo(DealCardBase);
