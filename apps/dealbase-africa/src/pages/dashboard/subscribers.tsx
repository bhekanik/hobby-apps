import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import { search } from "fast-fuzzy";
import React, { useEffect, useState } from "react";
import { SubscriberTable } from "src/components/DataTable/SubscriberTable";
import { useSubscribers } from "src/hooks/useSubscribers";
import { DashboardLayout } from "src/layouts/DashboardLayout";
import { Subscriber } from "src/pages/api/subscribers";

export const Subscribers = () => {
  const { subscribers, isLoading: subscribersLoading } = useSubscribers();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>(
    []
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    if (searchTerm) {
      const filtered = search(searchTerm, subscribers || [], {
        keySelector: (obj) => obj.email,
      });
      setFilteredSubscribers(filtered);
    } else {
      setFilteredSubscribers(subscribers || []);
    }
  }, [searchTerm, subscribers]);

  return (
    <DashboardLayout>
      <Box _dark={{ bg: "gray.900" }} bg="gray.50" p={8} rounded={16}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" mb={4}>
            Subscribers
          </Heading>
        </Flex>

        <Flex mt={4}>
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
        </Flex>
      </Box>

      <SubscriberTable
        subscribers={filteredSubscribers || []}
        subscribersLoading={subscribersLoading}
      />
    </DashboardLayout>
  );
};

export default Subscribers;

export { getServerSideProps } from "src/lib/Chakra";
