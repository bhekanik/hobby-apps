import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
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
import React, { memo } from "react";
import { VscInfo } from "react-icons/vsc";
import { Cell } from "react-table";
import { CloudinaryImage } from "shared-components";
import { CardProps } from "src/components/DataGrid";
import { Card } from "src/components/DataGrid/Card";
import { InvestorPopover } from "src/components/DataTable/InvestorsTable/InvestorPopover";
import { LinkText } from "src/components/LinkText";
import { useDeleteAlert } from "src/components/Modals/useDeleteAlert";
import { EntryType } from "src/hooks/useDeleteEntry";
import { InvestorWithDeals } from "src/hooks/useFilteredInvestors";
import { useUserPermissions } from "src/hooks/useUserPermissions";
import { Investor } from "types";

const InvestorCardBase = ({
  enableEdit,
  row,
  rowProps,
}: CardProps<InvestorWithDeals>) => {
  const { permissions } = useUserPermissions();
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  const {
    DeleteAlert,
    onOpen: onDeleteAlertOpen,
    isOpen: isDeleteAlertOpen,
  } = useDeleteAlert();

  return (
    <Card rowProps={rowProps}>
      {isDeleteAlertOpen && DeleteAlert && (
        <DeleteAlert entryType={EntryType.Deal} entry={row.original} />
      )}

      {row.cells.map((cell: Cell<Investor>) => {
        const { key: columnKey, ...restOfColumnProps } = cell.getCellProps();
        if (cell.column.id === "name") {
          return (
            <InvestorPopover
              onInvestorsModalOpen={() => null}
              onDeleteAlertOpen={() => null}
              key={columnKey}
              investor={row.original}
              trigger={
                <Box key={columnKey} {...restOfColumnProps}>
                  <Flex gap={4} alignItems="flex-start">
                    {row.original.logo?.cloudinary_public_id && (
                      <CloudinaryImage
                        publicId={row.original.logo.cloudinary_public_id}
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
                            {row.original.name}
                          </Text>
                          <Icon mt={1.5} as={VscInfo} fontSize={18} />
                        </Flex>
                      </Flex>

                      <Flex
                        align={isLessThan768 ? "initial" : "right"}
                        w="full"
                        justifyContent="space-between"
                        alignItems={isLessThan768 ? "center" : "right"}
                        flexDir={isLessThan768 ? "row" : "column"}
                      >
                        <Text align={isLessThan768 ? "initial" : "right"} m={0}>
                          {`Number of Deals`}
                        </Text>
                        <Text
                          align={isLessThan768 ? "initial" : "right"}
                          fontWeight="bold"
                          m={0}
                          fontSize={24}
                        >
                          {row.original.numberOfDealsInPeriod}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Divider mt={2} />
                </Box>
              }
            />
          );
        }
      })}

      <Flex
        alignItems="flex-start"
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
        <Text w="fit-content">Deal Range</Text>
        <Text p={0} m={0} align="right">
          {row.original.dealsRange ?? 0}
        </Text>
      </Flex>

      <Flex
        alignItems="flex-start"
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
        <Text w="fit-content">Stages</Text>
        <Text p={0} m={0} align="right">
          {row.original.stageCounts}
        </Text>
      </Flex>

      <Flex
        alignItems="flex-start"
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
        <Text w="fit-content">Sectors</Text>
        <Text p={0} m={0} align="right">
          {row.original.sectorCounts}
        </Text>
      </Flex>

      {row.cells.map((cell: Cell<Investor>) => {
        const { key: columnKey, ...restOfColumnProps } = cell.getCellProps();
        if (cell.column.id === "website") {
          return (
            <React.Fragment key={columnKey}>
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
                {row.original.website ? (
                  <LinkText
                    href={row.original.website}
                    label={"Visit Website"}
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
                ) : null}
              </Flex>
            </React.Fragment>
          );
        }
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

export const InvestorCard = memo(InvestorCardBase);
