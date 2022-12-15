import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "react-query";
import { ReturnType } from "src/pages/api/logos";
import { Logo } from "types";
import { useAuthHeaders } from "./useAuthHeaders";

export function useSaveLogos(): Omit<
  UseMutationResult<ReturnType, unknown, Logo[], unknown>,
  "mutate"
> & {
  saveLogos: UseMutateFunction<ReturnType, unknown, Logo[], unknown>;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation(
    async (inputData: Logo[]) => {
      const res = await fetch(`/api/logos`, {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: {
          "content-type": "application/json",
          "x-trace-id": new Date().getTime().toString(36),
          ...(authHeaders || {}),
        },
      });
      if (res.status >= 400) {
        const { message, stack } = await res.json();
        throw new Error(
          typeof message === "string"
            ? message
            : message?.message || stack || "Unknown error"
        );
      }
      return await res.json();
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("logos", {
          refetchActive: true,
          refetchInactive: true,
        });
      },
    }
  );

  return { saveLogos: mutate, ...rest };
}
