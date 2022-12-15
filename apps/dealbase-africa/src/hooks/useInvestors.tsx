import { useQuery, UseQueryResult } from "react-query";
import { Investor, ReturnType } from "types";

export function useInvestors(): Omit<UseQueryResult, "refetch" | "data"> & {
  investors: Investor[] | undefined;
  refetchInvestors: () => void;
} {
  const { data, refetch, ...rest } = useQuery<ReturnType>(
    "investors",
    () =>
      fetch(`/api/investors`, {
        headers: {
          "x-trace-id": new Date().getTime().toString(36),
          "x-auth-token": process.env.NEXT_PUBLIC_X_AUTH_TOKEN as string,
        },
      }).then((res) => res.json()),
    {
      refetchOnWindowFocus: false,
    }
  );

  return {
    refetchInvestors: refetch,
    investors: data?.investors,
    ...rest,
  };
}
