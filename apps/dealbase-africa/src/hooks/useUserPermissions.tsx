import { useEffect } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { ReturnType } from "src/pages/api/users";
import { useAuthHeaders } from "./useAuthHeaders";

export function useUserPermissions(): Omit<
  UseQueryResult,
  "refetch" | "data"
> & {
  permissions: string[];
  refetchPermissions: () => void;
} {
  const authHeaders = useAuthHeaders();

  const { data, refetch, ...rest } = useQuery<ReturnType>(
    "permissions",
    () =>
      fetch(`/api/users`, {
        headers: {
          "x-trace-id": new Date().getTime().toString(36),
          ...(authHeaders || {}),
        },
      }).then((res) => res.json()),
    { enabled: !!authHeaders, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (authHeaders) refetch();
  }, [authHeaders, refetch]);

  return {
    refetchPermissions: refetch,
    permissions: data?.permissions || [],
    ...rest,
  };
}
