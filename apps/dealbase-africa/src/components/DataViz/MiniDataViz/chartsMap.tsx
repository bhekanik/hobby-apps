import { Box, Grid } from "@chakra-ui/react";
import { moneyFormatter, numberFormatter } from "formatters";
import "mapbox-gl/dist/mapbox-gl.css";
import dynamic from "next/dynamic";
import MapComponent from "src/components/MapComponent";
import { Deal } from "types";

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

const RaceHorizontal = dynamic(
  () => import("src/components/Charts/RaceHorizontal"),
  {
    ssr: false,
  }
);

const GenderHorizontal = dynamic(
  () => import("src/components/Charts/GenderHorizontal"),
  {
    ssr: false,
  }
);

export const chartsMap = {
  monthly: {
    title: "Monthly Breakdown",
    component: <MonthlyBreakdown />,
    render: null,
    props: {
      h: "70vh",
    },
  },
  sectors: {
    title: "Sectors",
    component: <SectorBreakdown />,
    render: null,
    props: {
      h: "70vh",
    },
  },
  map: {
    title: "Map",
    render: ({
      width,
      height,
      ...props
    }: {
      deals: Deal[];
      width: number;
      height: number;
    }) => {
      return (
        <Grid placeItems="center" w="full" h="full">
          <MapComponent
            style={{
              position: "relative",
              width: 0.5 * width,
              height: 0.6 * height,
            }}
            {...props}
          />
        </Grid>
      );
    },
    component: null,
    props: {
      h: "full",
    },
  },
  compare: {
    title: "Compare",
    component: (
      <>
        <Box w="full" h="200px">
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
        <Box w="full" h="200px">
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
      </>
    ),
    render: null,
    props: {
      h: "60vh",
    },
  },
  diversity: {
    title: "Diversity",
    component: (
      <>
        <Box mb={4} w="full" h="200px">
          <RaceHorizontal />
        </Box>
        <Box w="full" h="200px">
          <GenderHorizontal />
        </Box>
      </>
    ),
    render: null,
    props: {
      h: "60vh",
    },
  },
};

export const getChart = (
  chart: keyof typeof chartsMap
): typeof chartsMap[keyof typeof chartsMap] => {
  return chartsMap[chart];
};
