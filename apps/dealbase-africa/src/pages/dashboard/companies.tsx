import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { CompaniesTable } from "src/components/DataTable/CompaniesTable";
import { useCompanyModal } from "src/components/Modals/useCompanyModal";
import { useCompanies } from "src/hooks";
import { useUserPermissions } from "src/hooks/useUserPermissions";
import { DashboardLayout } from "src/layouts/DashboardLayout";
import { Company } from "types";

export const CompaniesDashboardPage = () => {
  const { CompanyModal: CompaniesModal, onOpen: onCompaniesModalOpen } =
    useCompanyModal();

  const { permissions } = useUserPermissions();

  const { companies, isLoading: companiesLoading } = useCompanies();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredCompanies, setFilteredCompanies] = React.useState<Company[]>(
    []
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    if (searchTerm) {
      const filtered =
        companies?.filter((company) =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? [];
      setFilteredCompanies(filtered);
    } else {
      setFilteredCompanies(companies || []);
    }
  }, [searchTerm, companies]);

  return (
    <DashboardLayout>
      <Box _dark={{ bg: "gray.900" }} bg="gray.50" p={8} rounded={16}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" mb={4}>
            Companies
          </Heading>

          {permissions.includes("add:deals") && (
            <Button colorScheme="green" onClick={onCompaniesModalOpen}>
              Add A New Company
              <AddIcon ml={2} />
            </Button>
          )}
        </Flex>

        <Flex mt={4}>
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
        </Flex>
      </Box>

      <CompaniesModal />

      <CompaniesTable
        enableEdit
        companies={filteredCompanies || []}
        companiesLoading={companiesLoading}
        CompaniesModal={CompaniesModal}
        onCompaniesModalOpen={onCompaniesModalOpen}
      />
    </DashboardLayout>
  );
};

export default CompaniesDashboardPage;

export { getServerSideProps } from "src/lib/Chakra";
