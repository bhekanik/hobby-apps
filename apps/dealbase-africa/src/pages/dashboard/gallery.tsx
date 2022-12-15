import { Box, Flex, Heading } from "@chakra-ui/react";
import { BulkImageUploader } from "src/components/BulkImageUploader";
import { ImageGrid } from "src/components/ImageGrid";
import { DashboardLayout } from "src/layouts/DashboardLayout";

export const Gallery = () => {
  return (
    <DashboardLayout>
      <Box _dark={{ bg: "gray.900" }} bg="gray.50" p={8} rounded={16}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" mb={4}>
            Gallery
          </Heading>
        </Flex>

        <Flex mt={4} flexDir="column">
          <BulkImageUploader />
          <ImageGrid />
        </Flex>
      </Box>
    </DashboardLayout>
  );
};

export default Gallery;

export { getServerSideProps } from "src/lib/Chakra";
