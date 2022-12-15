import { ModalBody } from "@chakra-ui/react";
import { RefObject } from "react";
import { useForm } from "react-hook-form";
import { useSaveCompany } from "src/hooks";
import { useEditCompany } from "src/hooks/useEditCompany";
import { Company } from "types";
import { CompaniesFormFields } from "./CompaniesFormFields";

interface Props {
  company?: Company;
  initialRef?: RefObject<HTMLInputElement> | null;
  onDone: () => void;
  renderActions: (isLoading: boolean) => JSX.Element;
}

export const CompaniesForm = ({ company, renderActions, onDone }: Props) => {
  const { saveCompany, isLoading: companySaveLoading } = useSaveCompany();
  const { editCompany, isLoading: companyEditLoading } = useEditCompany();

  const { register, handleSubmit, getValues, setValue, control, watch } =
    useForm<Company>({
      defaultValues: {
        ...(company ?? {}),
      },
    });

  const onSubmit = async (data: Company) => {
    if (company) {
      await editCompany({
        ...data,
        id: company.id,
      });
    } else {
      await saveCompany({
        ...data,
      });
    }

    onDone();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody pb={6}>
        <CompaniesFormFields
          getValues={getValues}
          setValue={setValue}
          register={register}
          control={control}
          watch={watch}
        />
      </ModalBody>

      {renderActions(companySaveLoading || companyEditLoading)}
    </form>
  );
};
