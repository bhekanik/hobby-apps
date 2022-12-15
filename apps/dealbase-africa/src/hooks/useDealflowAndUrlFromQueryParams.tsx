import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore } from "src/stores/dealflow";

const formatUrlFromQueryParam = (url: string) => {
  if (!url) return "";

  return encodeURI(decodeURIComponent(url));
};

interface ReturnValue {
  url: string;
  hasDealflow: boolean;
}

export function useDealflowAndUrlFromQueryParams(): ReturnValue {
  const setDealflow = useStore((state) => state.setDealflow);

  const { query } = useRouter();

  const [url, setUrl] = useState(() =>
    query.url
      ? formatUrlFromQueryParam(query.url as string)
      : "https://res.cloudinary.com/dealbase-africa/image/upload/v1649538134/open-graph_flrncu.png"
  );

  useEffect(() => {
    if (!query) return;

    if (query.dealflow) {
      const newDealflow = JSON.parse(
        decodeURIComponent(query.dealflow as string)
      );
      setDealflow(newDealflow);
    }

    if (query.url) {
      const newUrl = formatUrlFromQueryParam(query.url as string);
      setUrl(newUrl);
    }
  }, [query, setDealflow]);

  return { url, hasDealflow: !!query.dealflow };
}
