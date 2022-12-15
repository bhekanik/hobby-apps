import { useToast } from "@chakra-ui/react";
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "react-query";
import { Company, ResultType } from "types";
import { useAuthHeaders } from "./useAuthHeaders";

export function useSaveCompany(): Omit<
  UseMutationResult<ResultType<Company>, unknown, Company, unknown>,
  "mutate"
> & {
  saveCompany: UseMutateFunction<
    ResultType<Company>,
    unknown,
    Company,
    unknown
  >;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, ...rest } = useMutation(
    (inputData: Company) => {
      return fetch(`/api/companies`, {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: {
          "content-type": "application/json",
          "x-trace-id": new Date().getTime().toString(36),
          ...(authHeaders || {}),
        },
      }).then((res) => res.json());
    },
    {
      onSuccess: async ({ data }) => {
        await queryClient.invalidateQueries("companies", {
          refetchActive: true,
          refetchInactive: true,
        });

        toast({
          title: "Successfully saved new company.",
          description: `${data.name} has been saved.`,
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

  return { saveCompany: mutate, ...rest };
}
