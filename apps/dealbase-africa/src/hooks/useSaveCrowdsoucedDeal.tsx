import { useToast } from "@chakra-ui/react";
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "react-query";
import { CrowdsourcedDeal, ReturnType } from "src/pages/api/crowdsourced_deal";
import { useAuthHeaders } from "./useAuthHeaders";

export function useSaveCrowdsourcedDeal(onClose: () => void): Omit<
  UseMutationResult<ReturnType, unknown, CrowdsourcedDeal, unknown>,
  "mutate"
> & {
  saveCrowdsourcedDeal: UseMutateFunction<
    ReturnType,
    unknown,
    CrowdsourcedDeal,
    unknown
  >;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, ...rest } = useMutation(
    (inputData: CrowdsourcedDeal) => {
      return fetch("/api/crowdsourced_deal", {
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
        await queryClient.invalidateQueries("crowdsourced_deals", {
          refetchActive: true,
          refetchInactive: true,
        });

        onClose();

        toast({
          title: "Successfully Submitted.",
          description: `Your deal has been submitted. Our team will verify it and once everything is verified it will be added to the list.`,
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

  return { saveCrowdsourcedDeal: mutate, ...rest };
}
