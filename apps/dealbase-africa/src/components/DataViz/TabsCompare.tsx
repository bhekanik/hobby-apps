import { Center, Divider, Flex, useMediaQuery } from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Statistics } from "src/components/Statistics";

export const TabsCompare = () => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  return (
    <Flex
      my={4}
      gap={isLessThan768 ? 4 : 8}
      flexDir={isLessThan768 ? "column" : "row"}
      alignItems="center"
      w="full"
      justifyContent="center"
    >
      <Flex justifyContent="center" alignItems="center" flexDir="column">
        <Statistics offset withTitle direction="column" />
      </Flex>
      <Center h={isLessThan768 ? "" : "100px"}>
        <Divider orientation={isLessThan768 ? "horizontal" : "vertical"} />
      </Center>
      <Flex justifyContent="center" alignItems="center" flexDir="column">
        <Statistics withTitle direction="column" />
      </Flex>
    </Flex>
  );
};
