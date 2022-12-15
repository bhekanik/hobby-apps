import NextHead from "next/head";
import { useEffect } from "react";
import { useStore } from "src/stores/dealflow";
import { IDealflow } from "types";
import { getTitle } from "./getTitle";

interface Props {
  title?: string;
  dealflow?: IDealflow;
  hasDealflow?: boolean;
  url?: string;
}

export function Head({ title, url, dealflow, hasDealflow = false }: Props) {
  const setDealflow = useStore((state) => state.setDealflow);

  useEffect(() => {
    if (dealflow) {
      setDealflow(dealflow);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealflow]);

  return (
    <NextHead>
      <title>
        {hasDealflow && dealflow
          ? getTitle(dealflow, title)
          : "dealbase.africa | Showcasing the African Startup Opportunity"}
      </title>
      <meta
        name="title"
        content={
          hasDealflow && dealflow
            ? getTitle(dealflow, title)
            : "dealbase.africa | Showcasing the African Startup Opportunity"
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
          hasDealflow && dealflow
            ? getTitle(dealflow, title)
            : "dealbase.africa | Showcasing the African Startup Opportunity"
        }
      />
      <meta
        property="og:description"
        content={`Showcasing the African Startup Opportunity | Equipping Founders to Raise Capital and Investors to Optimise Dealflow.`}
      />
      {url && (
        <>
          <meta property="og:image" content={url} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:secure_url" content={url} />
          <meta name="twitter:image" content={url} />
          <meta name="og:url" content={url} />
          <meta name="twitter:url" content={url} />
        </>
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={
          hasDealflow && dealflow
            ? getTitle(dealflow, title)
            : "dealbase.africa | Showcasing the African Startup Opportunity"
        }
      />
      <meta
        name="twitter:description"
        content={`Showcasing the African Startup Opportunity | Equipping Founders to Raise Capital and Investors to Optimise Dealflow.`}
      />
      <meta name="twitter:creator" content="@dealbase_africa" />
    </NextHead>
  );
}
