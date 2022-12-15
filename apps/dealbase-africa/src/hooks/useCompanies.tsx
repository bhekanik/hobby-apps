import { useQuery, UseQueryResult } from "react-query";
import { Company, ResultType } from "types";
import { useAuthHeaders } from "./useAuthHeaders";

export function useCompanies(): Omit<UseQueryResult, "refetch" | "data"> & {
  companies: Company[] | undefined;
  refetchCompanies: () => void;
} {
  const authHeaders = useAuthHeaders();

  const { data, refetch, ...rest } = useQuery<ResultType<Company>>(
    "companies",
    () =>
      fetch(`/api/companies`, {
        headers: {
          "x-trace-id": new Date().getTime().toString(36),
          ...(authHeaders || {}),
        },
      }).then((res) => res.json()),
    { refetchOnWindowFocus: false }
  );

  return {
    refetchCompanies: refetch,
    companies: data?.data as Company[],
    ...rest,
  };
}
