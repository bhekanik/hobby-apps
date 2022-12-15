import { Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { useLastUpdateDate } from "src/hooks/useLastUpdateDate";

interface Props {
  heading?: string;
  enableEdit?: boolean;
  dealsLoading?: boolean;
}

export const DataViewHeader = ({ heading }: Props) => {
  const lastUpdateDate = useLastUpdateDate();

  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <Text
        color="gray.500"
        w="full"
        align={isLessThan768 ? "center" : "right"}
      >
        {`Last Updated: ${formatDistance(lastUpdateDate, new Date())} ago`}
      </Text>

      {heading && (
        <Flex alignItems="center" justifyContent="space-between">
          <Heading w="full" fontSize={isLessThan768 ? 24 : 45} as="h1" mb={4}>
            {heading}
          </Heading>
        </Flex>
      )}
    </>
  );
};
