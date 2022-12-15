import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { debounce } from "debounce";
import { useEffect, useState } from "react";
import { DashboardInvestorTable } from "src/components/DataTable/DashboardInvestorTable";
import { useInvestorsModal } from "src/components/Modals/useInvestorsModal";
import { useInvestors } from "src/hooks";
import { useUserPermissions } from "src/hooks/useUserPermissions";
import { DashboardLayout } from "src/layouts/DashboardLayout";
import { Investor } from "types";

export const InvestorsDashboardPage = () => {
  const { InvestorsModal, onOpen: onInvestorsModalOpen } = useInvestorsModal();

  const { permissions } = useUserPermissions();

  const { investors, isLoading: investorsLoading } = useInvestors();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInvestors, setFilteredInvestors] = useState<Investor[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    if (searchTerm) {
      const filtered =
        investors?.filter((investor) =>
          investor.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? [];
      setFilteredInvestors(filtered);
    } else {
      setFilteredInvestors(investors || []);
    }
  }, [searchTerm, investors]);

  return (
    <DashboardLayout>
      <Box _dark={{ bg: "gray.900" }} bg="gray.50" p={8} rounded={16}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" mb={4}>
            Investors
          </Heading>

          {permissions.includes("add:deals") && (
            <Button colorScheme="green" onClick={onInvestorsModalOpen}>
              Add A New Investor
              <AddIcon ml={2} />
            </Button>
          )}
        </Flex>

        <Flex mt={4}>
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={debounce(handleChange, 300)}
          />
        </Flex>
      </Box>

      <InvestorsModal />

      <DashboardInvestorTable
        investors={filteredInvestors || []}
        investorsLoading={investorsLoading}
        enableEdit
        InvestorsModal={InvestorsModal}
        onInvestorsModalOpen={onInvestorsModalOpen}
      />
    </DashboardLayout>
  );
};

export default InvestorsDashboardPage;

export { getServerSideProps } from "src/lib/Chakra";
