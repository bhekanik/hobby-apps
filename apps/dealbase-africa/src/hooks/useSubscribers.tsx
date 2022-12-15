import { useEffect } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { ReturnType, Subscriber } from "src/pages/api/subscribers";
import { useAuthHeaders } from "./useAuthHeaders";

export function useSubscribers(): Omit<UseQueryResult, "refetch" | "data"> & {
  subscribers: Subscriber[] | undefined;
  refetchSubscribers: () => void;
} {
  const authHeaders = useAuthHeaders();

  const { data, refetch, ...rest } = useQuery<ReturnType>(
    "subscribers",
    () =>
      fetch(`/api/subscribers`, {
        headers: {
          "x-trace-id": new Date().getTime().toString(36),
          ...(authHeaders || {}),
        },
      }).then((res) => res.json()),
    {
      enabled: !!authHeaders,
    }
  );

  useEffect(() => {
    if (authHeaders) {
      refetch();
    }
  }, [authHeaders, refetch]);

  return {
    refetchSubscribers: refetch,
    subscribers: data?.subscribers,
    ...rest,
  };
}
