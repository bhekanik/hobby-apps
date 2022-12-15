import { ModalBody, useToast } from "@chakra-ui/react";
import { RefObject } from "react";
import { useForm } from "react-hook-form";
import { useSaveInvestor } from "src/hooks";
import { useEditInvestor } from "src/hooks/useEditInvestor";
import { Investor } from "types";
import { InvestorsFormFields } from "./InvestorsFormFields";

interface Props {
  investor?: Investor;
  initialRef?: RefObject<HTMLInputElement> | null;
  onDone: () => void;
  renderActions: (isLoading: boolean) => JSX.Element;
}

export const InvestorsForm = ({ investor, renderActions, onDone }: Props) => {
  const toast = useToast();

  const {
    saveInvestor,
    error,
    isLoading: investorSaveLoading,
    isError,
  } = useSaveInvestor();

  const {
    editInvestor,
    error: editError,
    isLoading: investorEditLoading,
  } = useEditInvestor(onDone);

  const { register, handleSubmit, getValues, setValue } = useForm<Investor>({
    defaultValues: {
      ...investor,
    },
  });

  const onSubmit = async (data: Investor) => {
    if (investor) {
      await editInvestor({
        ...data,
        id: investor.id,
      });
    } else {
      await saveInvestor({
        ...data,
      });

      if (!investorSaveLoading && !isError) {
        toast({
          title: "Investor Added.",
          description: `${data.name} has been added to the database.`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    }

    if (
      ((!investorEditLoading || !investorEditLoading) && isError) ||
      editError
    ) {
      return toast({
        title: "An error occurred.",
        description: `${(error as Error).message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    onDone();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody pb={6}>
        <InvestorsFormFields
          getValues={getValues}
          setValue={setValue}
          register={register}
        />
      </ModalBody>

      {renderActions(investorSaveLoading || investorEditLoading)}
    </form>
  );
};
