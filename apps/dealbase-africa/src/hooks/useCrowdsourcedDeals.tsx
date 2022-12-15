import { useEffect, useMemo } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { CrowdsourcedDeal, ReturnType } from "src/pages/api/crowdsourced_deal";
import { useAuthHeaders } from "./useAuthHeaders";

export function useCrowdsourcedDeals(): Omit<
  UseQueryResult,
  "refetch" | "data"
> & {
  crowdsourced_deals: CrowdsourcedDeal[] | undefined;
  refetchDeals: () => void;
} {
  const authHeaders = useAuthHeaders();

  const { data, refetch, ...rest } = useQuery<ReturnType>(
    "crowdsourced-deals",
    () => {
      return fetch(`/api/crowdsourced_deal`, {
        headers: {
          "x-trace-id": new Date().getTime().toString(36),
          ...(authHeaders || {}),
        },
      }).then((res) => res.json());
    },
    {
      enabled: !!authHeaders,
    }
  );

  useEffect(() => {
    if (authHeaders) {
      refetch();
    }
  }, [authHeaders, refetch]);

  return useMemo(
    () => ({
      refetchDeals: refetch,
      crowdsourced_deals: data?.crowdsourced_deals,
      ...rest,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );
}
