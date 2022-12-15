import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRef } from "react";
import { GrCloudUpload } from "react-icons/gr";
import { DealDataView } from "src/components/DataView/DealDataView";
import { Filters } from "src/components/Filters";
import { useAddDealModal } from "src/components/Modals/Deals/useAddDealModal";
import { useBulkAddModal } from "src/components/Modals/useBulkAddModal";
import { Statistics } from "src/components/Statistics";
import { useUserPermissions } from "src/hooks/useUserPermissions";
import { DashboardLayout } from "src/layouts/DashboardLayout";

export const Deals = () => {
  const {
    AddDealModal,
    onOpen: onDealsModalOpen,
    isOpen: isAddDealModalOpen,
  } = useAddDealModal();

  const {
    BulkAddModal,
    onOpen: onBulkAddModalOpen,
    isOpen: isBulkAddModalOpen,
  } = useBulkAddModal();

  const { permissions } = useUserPermissions();

  const tableRef = useRef<HTMLDivElement>(null);

  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  return (
    <DashboardLayout>
      <Box _dark={{ bg: "gray.900" }} bg="gray.50" p={8} rounded={16}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" mb={4}>
            Deals
          </Heading>

          {permissions.includes("add:deals") && (
            <Flex gap={2}>
              {isLessThan768 ? (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    name="menu"
                    role="button"
                    aria-label="Options"
                    size={isLessThan768 ? "lg" : "md"}
                    icon={<HamburgerIcon />}
                    variant="outline"
                  />
                  <MenuList zIndex="modal">
                    <MenuItem
                      onClick={onDealsModalOpen}
                      icon={<AddIcon ml={2} />}
                    >
                      Add A New Deal
                    </MenuItem>
                    <MenuItem
                      onClick={onBulkAddModalOpen}
                      icon={
                        <Icon
                          ml={2}
                          as={GrCloudUpload}
                          cursor="pointer"
                          color="#D98F39"
                        />
                      }
                    >
                      Bulk Upload Deals
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <Button colorScheme="green" onClick={onDealsModalOpen}>
                    Add A New Deal
                    <AddIcon ml={2} />
                  </Button>
                  <Button colorScheme="green" onClick={onBulkAddModalOpen}>
                    Bulk Upload Deals
                    <Icon
                      ml={2}
                      as={GrCloudUpload}
                      cursor="pointer"
                      color="#D98F39"
                    />
                  </Button>
                </>
              )}
            </Flex>
          )}
        </Flex>
        <Filters tableRef={tableRef} />
      </Box>

      {isAddDealModalOpen && <AddDealModal />}

      {isBulkAddModalOpen && <BulkAddModal />}

      <Statistics flexDir="row" w="full" />

      <DealDataView ref={tableRef} mt={4} enableEdit />
    </DashboardLayout>
  );
};

export default Deals;

export { getServerSideProps } from "src/lib/Chakra";
