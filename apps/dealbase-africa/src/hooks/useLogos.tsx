import { useQuery, UseQueryResult } from "react-query";
import { ReturnType } from "src/pages/api/logos";
import { Logo } from "types";

export type CompaniesFilterType = Partial<Record<keyof Logo, string | number>>;

export function useLogos(): Omit<UseQueryResult, "refetch" | "data"> & {
  logos: Logo[] | undefined;
  refetchLogos: () => void;
} {
  const { data, refetch, ...rest } = useQuery<ReturnType>(
    "logos",
    () =>
      fetch(`/api/logos`, {
        headers: {
          "x-trace-id": new Date().getTime().toString(36),
        },
      }).then((res) => res.json()),
    {
      refetchOnWindowFocus: true,
    }
  );

  return {
    refetchLogos: refetch,
    logos: data?.logos,
    ...rest,
  };
}
