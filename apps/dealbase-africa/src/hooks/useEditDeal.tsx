import { useToast } from "@chakra-ui/react";
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "react-query";
import { Deal, ResultType } from "types";
import { useAuthHeaders } from "./useAuthHeaders";

export function useEditDeal(onClose: () => void): Omit<
  UseMutationResult<ResultType<Deal>, unknown, Deal, unknown>,
  "mutate"
> & {
  editDeal: UseMutateFunction<ResultType<Deal>, unknown, Deal, unknown>;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, ...rest } = useMutation(
    (inputData: Deal) => {
      return fetch("/api/deals", {
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
          title: "Successfully updated deal.",
          description: `Deal has been updated.`,
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

  return { editDeal: mutate, ...rest };
}
