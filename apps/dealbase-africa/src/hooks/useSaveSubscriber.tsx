import { useToast } from "@chakra-ui/react";
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "react-query";
import { ReturnType, Subscriber } from "src/pages/api/subscribers";
import { useAuthHeaders } from "./useAuthHeaders";

export function useSaveSubscriber(onClose: () => void): Omit<
  UseMutationResult<ReturnType, unknown, Subscriber, unknown>,
  "mutate"
> & {
  saveSubscriber: UseMutateFunction<ReturnType, unknown, Subscriber, unknown>;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, ...rest } = useMutation(
    async (inputData: Subscriber) => {
      const res = await fetch("/api/subscribers", {
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
            : message?.details || message?.message || stack || "Unknown error"
        );
      }

      return await res.json();
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("subscribers", {
          refetchActive: true,
          refetchInactive: true,
        });

        onClose();

        toast({
          title: "Successfully Signed Up.",
          description: `Your details have been added to our subscriber list.`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      },
      onError: (error) => {
        toast({
          title: "An error occurred.",
          description: `${(typeof error === "string"
            ? error
            : (error as Error).message
          )
            .replace("Key (email)=(", "The email ")
            .replace(")", "")
            .replace("already exists", "has already been registered.")}`,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      },
    }
  );

  return { saveSubscriber: mutate, ...rest };
}
