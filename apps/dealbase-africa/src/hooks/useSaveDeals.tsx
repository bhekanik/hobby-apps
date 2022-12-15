import { useToast } from "@chakra-ui/react";
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "react-query";
import { DatabaseDeal, Deal, PressRelease, ResultType } from "types";
import { useAuthHeaders } from "./useAuthHeaders";

export type DatabaseDealFromCSV = Omit<DatabaseDeal, "press_release"> & {
  press_release: Omit<PressRelease, "date"> & {
    date: Date | null;
  };
};

export function useSaveDeals(onClose: () => void): Omit<
  UseMutationResult<ResultType<Deal>, unknown, DatabaseDealFromCSV[], unknown>,
  "mutate"
> & {
  saveDeals: UseMutateFunction<
    ResultType<Deal>,
    unknown,
    DatabaseDealFromCSV[],
    unknown
  >;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, ...rest } = useMutation(
    async (inputData: DatabaseDealFromCSV[]) => {
      const res = await fetch("/api/deals", {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: {
          "x-trace-id": new Date().getTime().toString(36),
          "content-type": "application/json",
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
        await queryClient.invalidateQueries("deals", {
          refetchActive: true,
          refetchInactive: true,
        });
        await queryClient.invalidateQueries("companies", {
          refetchActive: true,
          refetchInactive: true,
        });
        await queryClient.invalidateQueries("investors", {
          refetchActive: true,
          refetchInactive: true,
        });

        onClose();

        toast({
          title: "Successfully saved deals.",
          description: `The new deals have been saved.`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      },
      onError: (error) => {
        toast({
          title: "An error occurred.",
          description: `${
            typeof error === "string" ? error : (error as Error).message
          }`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      },
    }
  );

  return { saveDeals: mutate, ...rest };
}
