import dynamic from "next/dynamic";
import { Head } from "src/components/Head";
import { AppLayout } from "src/layouts/AppLayout";
import { IDealflow } from "types";

const HomeContents = dynamic(() => import("src/components/PageContents"), {
  ssr: false,
});

interface Props {
  url: string;
  dealflow: IDealflow;
  hasDealflow: boolean;
}

export default function HomeWithSignIn({ dealflow, url, hasDealflow }: Props) {
  return (
    <AppLayout withSignIn>
      <Head dealflow={dealflow} url={url} hasDealflow={hasDealflow} />
      <HomeContents />
    </AppLayout>
  );
}

export { getServerSideProps } from "./index";
