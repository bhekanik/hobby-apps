import { useMemo } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { Deal, ResultType } from "types";

export function useDeals(): Omit<UseQueryResult, "refetch" | "data"> & {
  deals: Deal[] | undefined;
  refetchDeals: () => void;
} {
  const { data, refetch, ...rest } = useQuery<ResultType<Deal>>("deals", () =>
    fetch(`/api/deals`, {
      headers: {
        "x-trace-id": new Date().getTime().toString(36),
        "x-auth-token": process.env.NEXT_PUBLIC_X_AUTH_TOKEN as string,
      },
    }).then((res) => res.json())
  );

  return useMemo(
    () => ({
      refetchDeals: refetch,
      deals: data?.data as Deal[],
      ...rest,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );
}
