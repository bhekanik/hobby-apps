import { useColorMode } from "@chakra-ui/react";
import { ResponsiveBar } from "@nivo/bar";
import { useDiversityData } from "src/hooks/useDiversityData";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
export const Race = () => {
  const { race } = useDiversityData();

  const { colorMode } = useColorMode();

  const maxValue =
    Math.max(
      race[0]["All-white founding team"],
      race[0]["Non-white/Diverse founding team"]
    ) * 1.2;

  return (
    <ResponsiveBar
      theme={{
        textColor: colorMode === "dark" ? "silver" : "gray",
        fontSize: 14,
        tooltip: {
          container: {
            color: "black",
          },
        },
      }}
      maxValue={maxValue}
      data={race}
      keys={["All White Founders", "Has Non-White Founder"]}
      indexBy="label"
      margin={{
        top: 100,
        right: 10,
        bottom: 80,
        left: 80,
      }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={({ id }) => {
        return id === "Has Non-White Founder" ? "#D98F39" : "#31A078";
      }}
      groupMode="grouped"
      borderColor={{
        from: "color",
        modifiers: [["darker", 2.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        // tickRotation: -90,
        // legend: "Race",
        legendPosition: "middle",
        legendOffset: 70,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Number",
        legendPosition: "middle",
        legendOffset: -55,
      }}
      // enableLabel={false}
      legends={[
        {
          dataFrom: "keys",
          anchor: "top",
          direction: "column",
          justify: false,
          translateX: 0,
          translateY: -60,
          itemsSpacing: 2,
          itemWidth: 200,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      labelSkipWidth={40}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["brighter", 3]],
      }}
      role="application"
      ariaLabel="Racial Diversity Chart"
    />
  );
};

export default Race;
