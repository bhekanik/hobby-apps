import { useToast } from "@chakra-ui/react";
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "react-query";
import { Investor, ReturnType } from "types";
import { useAuthHeaders } from "./useAuthHeaders";

export function useEditInvestor(onClose: () => void): Omit<
  UseMutationResult<ReturnType, unknown, Investor, unknown>,
  "mutate"
> & {
  editInvestor: UseMutateFunction<ReturnType, unknown, Investor, unknown>;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, ...rest } = useMutation(
    (inputData: Investor) => {
      return fetch("/api/investors", {
        method: "PATCH",
        body: JSON.stringify(inputData),
        headers: {
          "content-type": "application/json",
          "x-trace-id": new Date().getTime().toString(36),
          ...(authHeaders || {}),
        },
      }).then((res) => res.json());
    },
    {
      onSuccess: async ({ investor }) => {
        await queryClient.invalidateQueries("investors", {
          refetchActive: true,
          refetchInactive: true,
        });

        onClose();

        toast({
          title: "Investor Updated.",
          description: `${investor.name} has been updated.`,
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

  return { editInvestor: mutate, ...rest };
}
