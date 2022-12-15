import {
  Box,
  Flex,
  Heading,
  Skeleton,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { formatTopCountries, formatTopStages } from "formatters";
import { useEffect, useState } from "react";
import { useDeals } from "src/hooks";

export const Summaries = () => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const { deals, isLoading: dealsLoading } = useDeals();

  const [topCountries, setTopCountries] = useState<string[]>([]);
  const [topStages, setTopStages] = useState<string[]>([]);

  useEffect(() => {
    setTopCountries(formatTopCountries(deals || []));
    setTopStages(formatTopStages(deals || []));
  }, [deals]);

  return (
    <Flex gap={4} my={4} direction={isLessThan768 ? "column" : "row"} w="full">
      <Box
        _dark={{ bg: "gray.900" }}
        bg="gray.50"
        rounded={8}
        boxShadow="lg"
        p={8}
        flex={1}
      >
        <Skeleton isLoaded={!dealsLoading}>
          <Heading fontSize="xl" mb={4}>
            Top Countries
          </Heading>
        </Skeleton>
        <Skeleton isLoaded={!dealsLoading}>
          <Box as="ul" ml={8}>
            {topCountries?.map((country) => (
              <Text as="li" key={country}>
                {country}
              </Text>
            ))}
          </Box>
        </Skeleton>
      </Box>
      <Box
        _dark={{ bg: "gray.900" }}
        bg="gray.50"
        rounded={8}
        boxShadow="lg"
        p={8}
        flex={1}
      >
        <Skeleton isLoaded={!dealsLoading}>
          <Heading fontSize="xl" mb={4}>
            Top Stages
          </Heading>
        </Skeleton>
        <Skeleton isLoaded={!dealsLoading}>
          <Box as="ul" ml={8}>
            {topStages?.map((country) => (
              <Text as="li" key={country}>
                {country}
              </Text>
            ))}
          </Box>
        </Skeleton>
      </Box>
      <Box
        _dark={{ bg: "gray.900" }}
        bg="gray.50"
        rounded={8}
        boxShadow="lg"
        p={8}
        flex={1}
      >
        <Skeleton isLoaded={!dealsLoading}>
          <Heading fontSize="xl" mb={4}>
            Top Dates
          </Heading>
        </Skeleton>
        <Skeleton isLoaded={!dealsLoading}></Skeleton>
      </Box>
    </Flex>
  );
};
