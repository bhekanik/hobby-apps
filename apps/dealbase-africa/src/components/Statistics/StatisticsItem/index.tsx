import {
  Box,
  Flex,
  FlexProps,
  Skeleton,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";

interface Props {
  icon: string;
  label: string;
  loading?: boolean;
  number: number | string;
}

export const StatisticsItem = ({
  icon,
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
      rounded={isLessThan768 ? 12 : 24}
      boxShadow="lg"
      w="full"
      p={isLessThan768 ? 4 : 8}
      gap={4}
      alignItems="center"
      {...flexProps}
    >
      {!isLessThan768 && (
        <Image alt="icon" src={icon || ""} width={80} height={80} />
      )}

      <Box w={isLessThan768 ? "auto" : "90px"}>
        <Skeleton isLoaded={!loading}>
          <Text whiteSpace="nowrap" fontWeight="bold" fontSize={25}>
            {number}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!loading}>
          <Text textTransform="uppercase" fontSize={16}>
            {label}
          </Text>
        </Skeleton>
      </Box>
    </Flex>
  );
};
