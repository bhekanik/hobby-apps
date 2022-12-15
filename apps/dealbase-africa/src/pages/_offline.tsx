import { Flex } from "@chakra-ui/react";
import { Head } from "src/components/Head";
import { AppLayout } from "src/layouts/AppLayout";

export default function Offline() {
  return (
    <AppLayout>
      <Head />
      <Flex alignItems="center" justifyContent="center">
        Offline
      </Flex>
    </AppLayout>
  );
}
