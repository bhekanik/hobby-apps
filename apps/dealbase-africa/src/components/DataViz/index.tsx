import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { moneyFormatter, numberFormatter } from "formatters";
import "mapbox-gl/dist/mapbox-gl.css";
import dynamic from "next/dynamic";
import { Loader } from "src/components/Loader";
import { MapComponent } from "src/components/MapComponent";
import { Share } from "src/components/Share";
import { Statistics } from "src/components/Statistics";
import { useFeatureFlag } from "src/contexts/FeatureFlags";
import { useFilteredDeals } from "src/hooks/useFilteredDeals";

const Compare = dynamic(() => import("src/components/Charts/Compare"), {
  ssr: false,
});

const MonthlyBreakdown = dynamic(
  () => import("src/components/Charts/Breakdown/Monthly"),
  {
    ssr: false,
  }
);

const SectorBreakdown = dynamic(
  () => import("src/components/Charts/Breakdown/Sector"),
  {
    ssr: false,
  }
);

const GenderPie = dynamic(() => import("src/components/Charts/GenderPie"), {
  ssr: false,
});

const RacePie = dynamic(() => import("src/components/Charts/RacePie"), {
  ssr: false,
});

export const DataViz = () => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const { colorMode } = useColorMode();

  const { filteredDeals, isFetched, dealsLoading } = useFilteredDeals();

  const compareFlag = useFeatureFlag("compare");

  if (isFetched && dealsLoading)
    return (
      <Loader
        position="absolute"
        top="0"
        bottom="0"
        right="0"
        left="0"
        zIndex="overlay"
      />
    );

  return compareFlag ? (
    <Flex
      mt={12}
      mb={4}
      gap={4}
      flexDir={isLessThan768 ? "column" : "row"}
      alignItems={isLessThan768 ? "center" : "flex-start"}
      w="full"
    >
      <Tabs
        w="full"
        align="center"
        colorScheme="green"
        size={isLessThan768 ? "xs" : "md"}
        isFitted
        isLazy
        variant={isLessThan768 ? "enclosed-colored" : "solid-rounded"}
      >
        <TabList>
          <Tab>Map</Tab>
          <Tab>Compare</Tab>
          <Tab>Breakdown</Tab>
          <Tab>Diversity</Tab>
        </TabList>

        <TabPanels mt={2}>
          <TabPanel>
            <Box flex={1} boxShadow="0px 0px 20px -5px rgba(0, 0, 0, 0.25)">
              <MapComponent deals={filteredDeals || []} />
            </Box>
          </TabPanel>
          <TabPanel
            bg={colorMode === "dark" ? "gray.800" : "gray.100"}
            boxShadow="0px 0px 20px -5px rgba(0, 0, 0, 0.25)"
            display="flex"
            h="full"
            flexDir="column"
            alignItems="center"
          >
            {/* <CompareOffsetPicker /> */}

            <Box mb={4} w="full" h="250px">
              <Compare
                showLegend
                valueFormatter={(value: number) =>
                  `${moneyFormatter(value, {
                    minimumFractionDigits: 0,
                    // maximumFractionDigits: 0,
                  })}`
                }
                label="Value"
                type="value"
              />
            </Box>
            <Box my={4} w="full" h="250px">
              <Compare
                valueFormatter={(value: number) =>
                  `${numberFormatter(value, {
                    minimumFractionDigits: 0,
                    // maximumFractionDigits: 0,
                  })}`
                }
                label="Deals"
                type="deals"
              />
            </Box>
          </TabPanel>
          <TabPanel
            bg={colorMode === "dark" ? "gray.800" : "gray.100"}
            boxShadow="0px 0px 20px -5px rgba(0, 0, 0, 0.25)"
            display="flex"
            h="700px"
            flexDir="column"
            alignItems="center"
          >
            <SectorBreakdown />
            <MonthlyBreakdown />
          </TabPanel>
          <TabPanel
            bg={colorMode === "dark" ? "gray.800" : "gray.100"}
            boxShadow="0px 0px 20px -5px rgba(0, 0, 0, 0.25)"
            display="flex"
            h="full"
            flexDir={isLessThan768 ? "column" : "row"}
            alignItems="center"
          >
            <Box w="full" h="500px">
              <RacePie />
            </Box>
            <Box mb={4} w="full" h="500px">
              <GenderPie />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Flex
        h="full"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
      >
        <Statistics direction="column" />
        <Share
          isDisabled={
            [...new Set(filteredDeals?.map((deal) => deal.company.name))]
              .length < 1
          }
        />
      </Flex>
    </Flex>
  ) : (
    <Flex
      my={4}
      gap={4}
      flexDir={isLessThan768 ? "column" : "row"}
      alignItems="center"
    >
      <Box flex={1} boxShadow="0px 0px 20px -5px rgba(0, 0, 0, 0.25)">
        <MapComponent deals={filteredDeals || []} />
      </Box>
      <Flex justifyContent="center" alignItems="center" flexDir="column">
        <Statistics direction="column" />
        <Share
          isDisabled={
            [...new Set(filteredDeals?.map((deal) => deal.company.name))]
              .length < 1
          }
        />
      </Flex>
    </Flex>
  );
};
