import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { formatUrlFromQueryParam } from "formatters";
import { GetServerSidePropsContext } from "next";
import { useRef } from "react";
import { DealDataView } from "src/components/DataView/DealDataView";
import Filters from "src/components/Filters";
import { Head } from "src/components/Head";
import { Loader } from "src/components/Loader";
import MapComponent from "src/components/MapComponent";
import { Share } from "src/components/Share";
import { Statistics } from "src/components/Statistics";
import { useFilteredDeals } from "src/hooks/useFilteredDeals";
import { AppLayout } from "src/layouts/AppLayout";
import { IDealflow } from "types";

// Need to import this this way so that they are not server rendered. This is
// because the useMediaQuery hook relies on window.matchMedia which relies on
// window existing.
// const InvestorsContent = dynamic(
//   () => import("src/components/PageContents/Investors"),
//   {
//     ssr: false,
//   }
// );

interface Props {
  url: string;
  dealflow: IDealflow;
  hasDealflow: boolean;
}

export default function InvestorsAnalyticsPage({
  dealflow,
  url,
  hasDealflow,
}: Props) {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  const { filteredDeals, isFetched, dealsLoading } = useFilteredDeals();

  const tableRef = useRef<HTMLDivElement>(null);

  if (isFetched && dealsLoading)
    return (
      <Loader
        position="absolute"
        top="0"
        bottom="0"
        right="0"
        left="0"
        zIndex="overlay"
      />
    );

  return (
    <AppLayout>
      <Head dealflow={dealflow} url={url} hasDealflow={hasDealflow} />
      <>
        {!isFetched && dealsLoading ? (
          <Loader
            position="absolute"
            top="0"
            bottom="0"
            right="0"
            left="0"
            zIndex="overlay"
          />
        ) : null}

        <Box
          display="flex"
          mx="auto"
          maxW="1920px"
          flexDirection="column"
          alignItems="center"
          p={isLessThan768 ? 4 : 16}
        >
          <Text
            as="h1"
            fontSize={32}
            fontWeight="bold"
            maxW="500px"
            align="center"
            mb={8}
          >
            Investor Analytics
          </Text>

          <Filters tableRef={tableRef} />

          <Flex
            my={4}
            gap={4}
            flexDir={isLessThan768 ? "column" : "row"}
            alignItems="center"
          >
            <Box flex={1} boxShadow="0px 0px 20px -5px rgba(0, 0, 0, 0.25)">
              <MapComponent deals={filteredDeals || []} />
            </Box>
            <Flex justifyContent="center" alignItems="center" flexDir="column">
              <Statistics direction="column" />
              <Share
                isDisabled={
                  [...new Set(filteredDeals?.map((deal) => deal.company.name))]
                    .length < 1
                }
              />
            </Flex>
          </Flex>

          <DealDataView ref={tableRef} heading />
        </Box>
      </>
    </AppLayout>
  );
}

export async function getServerSideProps({
  req,
  query,
}: GetServerSidePropsContext) {
  let url =
    "https://res.cloudinary.com/dealbase-africa/image/upload/v1649724922/banner_pprevt.jpg";

  let dealflow: IDealflow | null = null;
  let hasDealflow = false;

  if (query.dealflow) {
    hasDealflow = true;
    const newDealflow = JSON.parse(
      decodeURIComponent(query.dealflow as string)
    );
    dealflow = newDealflow;
  }

  if (query.url) {
    url = formatUrlFromQueryParam(query.url as string);
  }

  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? "",
      dealflow,
      url,
      hasDealflow,
    },
  };
}
