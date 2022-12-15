import { formatUrlFromQueryParam } from "formatters";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { Head } from "src/components/Head";
// import { HomeContents } from "src/components/PageContents";
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

export default function Home({ dealflow, url, hasDealflow }: Props) {
  return (
    <AppLayout>
      <Head dealflow={dealflow} url={url} hasDealflow={hasDealflow} />
      <HomeContents />
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
