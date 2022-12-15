import {
  Flex,
  Grid,
  GridItem,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MiniDataViz } from "src/components/DataViz/MiniDataViz";
import MiniFilter from "src/components/Filters/MiniFilter";
import { Logo } from "src/components/Header/Logo";
import { Watermark } from "src/components/Watermark";

const clients = ["bk", "mathew", "tyler"];

export default function Embed() {
  const {
    query: { clientId, charts, theme, width, height, w, h },
  } = useRouter();

  const { setColorMode } = useColorMode();

  useEffect(() => {
    if (["light", "dark"].includes(theme as string)) {
      setColorMode(theme);
    }
  }, [theme]);

  if (typeof clientId !== "string") {
    return (
      <Flex
        mx="auto"
        maxW="1920px"
        flexDirection="column"
        alignItems="center"
        p={16}
      >
        <Link w={36} overflow="none">
          <Logo />
        </Link>
        <Text as="h1" fontSize={18} fontWeight="bold">
          Something went wrong. Please try again later.
        </Text>
        <Link as={NextLink} href="/">
          Go back to the dealbase.africa homepage
        </Link>
      </Flex>
    );
  }

  if (!clients.includes(clientId as string)) {
    return (
      <Flex
        mx="auto"
        maxW="1920px"
        flexDirection="column"
        alignItems="center"
        p={16}
      >
        <Link w={36} overflow="none">
          <Logo />
        </Link>
        <Text as="h1" fontSize={18} fontWeight="bold">
          Sorry, you do not have access to this page.
        </Text>
        <Link as={NextLink} href="/">
          Go back to the dealbase.africa homepage
        </Link>
      </Flex>
    );
  }

  return (
    <Grid
      w="100vw"
      templateColumns={"220px 1fr"}
      placeItems="center"
      h="100vh"
      position="relative"
      gap={2}
      border="1px solid"
      borderColor="gray.200"
      _dark={{
        borderColor: "gray.600",
      }}
    >
      <GridItem
        borderRight="1px solid"
        borderColor="gray.200"
        _dark={{
          borderColor: "gray.600",
        }}
        p={8}
        rowSpan={1}
        colSpan={1}
        w="full"
        h="full"
      >
        <MiniFilter />
      </GridItem>
      <GridItem px={8} rowSpan={1} colSpan={1} w="full" h="full">
        <MiniDataViz
          charts={charts as string}
          width={(width as string) || (w as string)}
          height={(height as string) || (h as string)}
        />
      </GridItem>
      <Watermark />
    </Grid>
  );
}
