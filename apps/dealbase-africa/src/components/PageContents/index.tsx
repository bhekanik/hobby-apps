import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef } from "react";
import { DealDataView } from "src/components/DataView/DealDataView";
import { InvestorsDataView } from "src/components/DataView/Investors";
import { DataViz } from "src/components/DataViz";
import { Filters } from "src/components/Filters";

export function HomeContents() {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  const tableRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      display="flex"
      mx="auto"
      maxW="1920px"
      flexDirection="column"
      alignItems="center"
      p={isLessThan768 ? 4 : 16}
    >
      <Text
        as="h1"
        fontSize={32}
        fontWeight="bold"
        maxW="500px"
        align="center"
        mb={8}
      >
        Track the Latest in African Tech Fundraising
      </Text>

      <Filters tableRef={tableRef} />

      <DataViz />

      <Tabs w="full" align="center" colorScheme="green" variant="solid-rounded">
        <TabList>
          <Tab>Deals</Tab>
          <Tab>Investors</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DealDataView ref={tableRef} heading />
          </TabPanel>

          <TabPanel>
            <InvestorsDataView ref={tableRef} heading />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default HomeContents;
