import { Flex, Link, Text } from "@chakra-ui/react";
import { Logo } from "src/components/Header/Logo";

export const Watermark = () => {
  return (
    <Flex
      alignItems="flex-start"
      position="fixed"
      bottom={4}
      left={10}
      flexDir="column"
      opacity="80%"
    >
      <Text w="fit-content" mr={2}>
        Powered by:
      </Text>
      <Link w={36} overflow="none">
        <Logo />
      </Link>
    </Flex>
  );
};
