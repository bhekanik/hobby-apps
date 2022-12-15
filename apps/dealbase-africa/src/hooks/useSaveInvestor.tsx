import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "react-query";
import { Investor, ReturnType } from "types";
import { useAuthHeaders } from "./useAuthHeaders";

export function useSaveInvestor(): Omit<
  UseMutationResult<ReturnType, unknown, Investor, unknown>,
  "mutate"
> & {
  saveInvestor: UseMutateFunction<ReturnType, unknown, Investor, unknown>;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation(
    (inputData: Investor) => {
      return fetch("/api/investors", {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: {
          "content-type": "application/json",
          "x-trace-id": new Date().getTime().toString(36),
          ...(authHeaders || {}),
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      });
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("investors", {
          refetchActive: true,
          refetchInactive: true,
        });
      },
    }
  );

  return { saveInvestor: mutate, ...rest };
}
