import {
  Flex,
  FlexProps,
  Skeleton,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

interface Props {
  label: string;
  loading?: boolean;
  number: number | string;
}

export const MiniStatisticsItem = ({
  loading,
  label,
  number,
  ...flexProps
}: Props & FlexProps) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  return (
    <Flex
      _dark={{ bg: "gray.900" }}
      bg="gray.50"
      rounded={4}
      flexDir={isLessThan768 ? "column" : "row"}
      boxShadow="lg"
      w="full"
      p={4}
      py={1}
      gap={isLessThan768 ? 0 : 4}
      alignItems="center"
      {...flexProps}
    >
      <Skeleton isLoaded={!loading}>
        <Text textTransform="uppercase" fontSize={16}>
          {label}
        </Text>
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <Text whiteSpace="nowrap" fontWeight="bold" fontSize={25}>
          {number}
        </Text>
      </Skeleton>
    </Flex>
  );
};
