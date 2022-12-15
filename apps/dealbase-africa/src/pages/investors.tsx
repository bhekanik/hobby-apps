import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { useRef } from "react";
import { DealDataView } from "src/components/DataView/DealDataView";
import Filters from "src/components/Filters";
import { Head } from "src/components/Head";
import { useFeatureRedirect } from "src/hooks/useFeatureRedirect";
import { AppLayout } from "src/layouts/AppLayout";
import { IDealflow } from "types";

interface Props {
  url: string;
  dealflow: IDealflow;
  hasDealflow: boolean;
}

export default function InvestorsPage({ dealflow, url, hasDealflow }: Props) {
  useFeatureRedirect("data");

  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  const tableRef = useRef<HTMLDivElement>(null);

  return (
    <AppLayout>
      <Head dealflow={dealflow} url={url} hasDealflow={hasDealflow} />
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
          Investors
        </Text>

        <Filters tableRef={tableRef} />

        <DealDataView mt={4} ref={tableRef} heading />
      </Box>
    </AppLayout>
  );
}

export { getServerSideProps } from "./index";
