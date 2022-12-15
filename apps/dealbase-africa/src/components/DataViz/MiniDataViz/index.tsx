import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import "mapbox-gl/dist/mapbox-gl.css";
import { useFilteredDeals } from "src/hooks/useFilteredDeals";
import { useLastUpdateDate } from "src/hooks/useLastUpdateDate";
import { MiniStatistics } from "../../Statistics/MiniStatistics";
import { chartsMap, getChart } from "./chartsMap";

type Charts = keyof typeof chartsMap;

interface Props {
  charts: string;
  width: string;
  height: string;
}

export const MiniDataViz = ({ charts, width, height }: Props) => {
  const chartsArray = charts?.split(",").map((item) => item.trim()) ?? [];

  const lastUpdateDate = useLastUpdateDate();

  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const { colorMode } = useColorMode();

  const { filteredDeals } = useFilteredDeals();

  return (
    <Flex
      mt={isLessThan768 ? 8 : 4}
      gap={4}
      flexDir={"column"}
      alignItems={isLessThan768 ? "center" : "flex-start"}
    >
      <Flex
        h="full"
        w="full"
        position="relative"
        justifyContent="center"
        alignItems="center"
      >
        <MiniStatistics />
        {/* <Share
          isDisabled={
            [...new Set(filteredDeals?.map((deal) => deal.company.name))]
              .length < 1
          }
        /> */}

        <Text
          position="absolute"
          top={isLessThan768 ? -6 : "initial"}
          color="gray.500"
          w="full"
          fontSize={11}
          align={isLessThan768 ? "center" : "right"}
        >
          {`Last Updated: ${formatDistance(lastUpdateDate, new Date())} ago`}
        </Text>
      </Flex>

      <Tabs
        w="full"
        align="center"
        colorScheme="green"
        size={isLessThan768 ? "xs" : "sm"}
        isFitted
        isLazy
        variant="enclosed-colored"
      >
        <TabList>
          {chartsArray.map((chart) => {
            const item = getChart(chart as Charts);
            if (!item) return null;
            return <Tab key={chart}>{item.title}</Tab>;
          })}
        </TabList>

        <TabPanels mt={2}>
          {chartsArray.map((chart) => {
            const item = getChart(chart as Charts);

            if (!item) return null;

            if (chart === "map") {
              let itemToRender = null;
              if (isNaN(parseInt(width)) || isNaN(parseInt(height))) {
                itemToRender =
                  "Map cannot be rendered without height and width";
              } else {
                itemToRender = item.render?.({
                  deals: filteredDeals ?? [],
                  width: parseInt(width),
                  height: parseInt(height),
                });
              }

              return (
                <TabPanel
                  key={chart}
                  bg={colorMode === "dark" ? "gray.800" : "gray.100"}
                  boxShadow="0px 0px 20px -5px rgba(0, 0, 0, 0.25)"
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                  {...item.props}
                >
                  {itemToRender}
                </TabPanel>
              );
            }

            return (
              <TabPanel
                key={chart}
                bg={colorMode === "dark" ? "gray.800" : "gray.100"}
                boxShadow="0px 0px 20px -5px rgba(0, 0, 0, 0.25)"
                display="flex"
                flexDir="column"
                alignItems="center"
                {...item.props}
              >
                {item.component}
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
