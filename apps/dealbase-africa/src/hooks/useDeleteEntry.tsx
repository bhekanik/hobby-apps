import { useToast } from "@chakra-ui/react";
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "react-query";
import { Company, Deal, Investor, ResultType } from "types";
import { useAuthHeaders } from "./useAuthHeaders";

export enum EntryType {
  Deal = "deals",
  Investor = "investors",
  Company = "companies",
}

export function useDeleteEntry(
  entryType: EntryType,
  onClose: () => void
): Omit<
  UseMutationResult<
    ResultType<Deal | Company | Investor>,
    unknown,
    number,
    unknown
  >,
  "mutate"
> & {
  deleteEntry: UseMutateFunction<
    ResultType<Deal | Company | Investor>,
    unknown,
    number,
    unknown
  >;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, ...rest } = useMutation(
    (id: number) => {
      return fetch(`/api/${entryType}`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
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
          title: "Entry Deleted.",
          description: `Entry has been deleted.`,
          status: "success",
          duration: 5000,
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

  return { deleteEntry: mutate, ...rest };
}
