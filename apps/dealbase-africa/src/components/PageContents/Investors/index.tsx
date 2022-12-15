import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef } from "react";
import { DealDataView } from "src/components/DataView/DealDataView";
import { Filters } from "src/components/Filters";
import { Loader } from "src/components/Loader";
import { MapComponent } from "src/components/MapComponent";
import { Share } from "src/components/Share";
import { Statistics } from "src/components/Statistics";
import { useFilteredDeals } from "src/hooks/useFilteredDeals";

export function InvestorsContent() {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  const { filteredDeals, isFetched, dealsLoading } = useFilteredDeals();

  const tableRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      {!isFetched && dealsLoading ? (
        <Loader
          position="absolute"
          top="0"
          bottom="0"
          right="0"
          left="0"
          zIndex="overlay"
        />
      ) : null}

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
          Investor Analytics
        </Text>

        <Filters tableRef={tableRef} />

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

        <DealDataView ref={tableRef} heading />
      </Box>
    </>
  );
}

export default InvestorsContent;
