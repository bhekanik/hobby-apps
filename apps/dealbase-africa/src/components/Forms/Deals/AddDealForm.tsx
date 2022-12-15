import { ModalBody } from "@chakra-ui/react";
import { memo, RefObject } from "react";
import { useForm } from "react-hook-form";
import { AddDealFormFields } from "src/components/Forms/Deals/AddDealFormFields";
import { useSaveDeal } from "src/hooks";
import { Deal } from "types";

interface Props {
  deal?: Deal;
  initialRef?: RefObject<HTMLInputElement> | null;
  onDone: () => void;
  renderActions: (isLoading: boolean) => JSX.Element;
}

const AddDealFormBase = ({ deal, renderActions, onDone }: Props) => {
  const { saveDeal, status: saveDealStatus } = useSaveDeal(onDone);

  const { register, handleSubmit, control, getValues, setValue, watch } =
    useForm<Deal>({
      defaultValues: {
        ...deal,
      },
    });

  const onSubmit = async (data: Deal) => {
    const {
      press_release: { date, link },
      investors,
    } = data;

    const newDeal = {
      ...data,
      press_release: { date: new Date(date).toUTCString(), link },
      investors: JSON.stringify(investors || []),
    };

    await saveDeal(newDeal);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody pb={6}>
        <AddDealFormFields
          register={register}
          control={control}
          getValues={getValues}
          setValue={setValue}
          watch={watch}
        />
      </ModalBody>

      {renderActions(saveDealStatus === "loading")}
    </form>
  );
};

export const AddDealForm = memo(AddDealFormBase);
