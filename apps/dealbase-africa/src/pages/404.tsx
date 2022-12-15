import { Flex, Link, Text } from "@chakra-ui/react";
import NextHead from "next/head";
import NextLink from "next/link";
import { Logo } from "src/components/Header/Logo";

export default function Home() {
  return (
    <>
      <NextHead>
        <title>
          {"dealbase.africa | Showcasing the African Startup Opportunity"}
        </title>
        <meta
          name="title"
          content={
            "dealbase.africa | Showcasing the African Startup Opportunity"
          }
        />
        <meta
          name="description"
          content={`Showcasing the African Startup Opportunity | Equipping Founders to Raise Capital and Investors to Optimise Dealflow.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="dealbase.africa" />
        <meta
          property="og:title"
          content={
            "dealbase.africa | Showcasing the African Startup Opportunity"
          }
        />
        <meta
          property="og:description"
          content={`Showcasing the African Startup Opportunity | Equipping Founders to Raise Capital and Investors to Optimise Dealflow.`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={
            "dealbase.africa | Showcasing the African Startup Opportunity"
          }
        />
        <meta
          name="twitter:description"
          content={`Showcasing the African Startup Opportunity | Equipping Founders to Raise Capital and Investors to Optimise Dealflow.`}
        />
        <meta name="twitter:creator" content="@dealbase_africa" />
      </NextHead>
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
        <Text as="p">Or</Text>
        <Link as={NextLink} href="/">
          Go back to the homepage
        </Link>
      </Flex>
    </>
  );
}
