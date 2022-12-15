import { ModalBody } from "@chakra-ui/react";
import { memo, RefObject } from "react";
import { useForm } from "react-hook-form";
import { EditDealFormFields } from "src/components/Forms/Deals/EditDealFormFields";
import { useEditDeal } from "src/hooks";
import { Deal } from "types";

interface Props {
  deal?: Deal;
  initialRef?: RefObject<HTMLInputElement> | null;
  onDone: () => void;
  renderActions: (isLoading: boolean) => JSX.Element;
}

const EditDealFormBase = ({ deal, renderActions, onDone }: Props) => {
  const { editDeal, status: editDealStatus } = useEditDeal(onDone);

  const { register, handleSubmit, control, getValues, setValue, watch } =
    useForm<Deal>({
      defaultValues: {
        ...deal,
      },
    });

  const onSubmit = async (data: Deal) => {
    const {
      press_release: { date, link },
      ...remainingDeal
    } = data;

    if (deal) {
      await editDeal({
        ...remainingDeal,
        id: deal.id,
        press_release: { date: new Date(date).toUTCString(), link },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody pb={6}>
        <EditDealFormFields
          register={register}
          control={control}
          getValues={getValues}
          setValue={setValue}
          watch={watch}
        />
      </ModalBody>

      {renderActions(editDealStatus === "loading")}
    </form>
  );
};

export const EditDealForm = memo(EditDealFormBase);
