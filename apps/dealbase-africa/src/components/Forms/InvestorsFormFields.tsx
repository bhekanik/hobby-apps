import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Investor } from "types";
import { ImageUploader } from "../ImageUploader";

interface Props {
  register: UseFormRegister<Investor>;
  getValues: UseFormGetValues<Investor>;
  setValue: UseFormSetValue<Investor>;
}

export const InvestorsFormFields = ({
  register,
  getValues,
  setValue,
}: Props) => {
  useEffect(() => {
    register("logo");
  }, [register]);

  return (
    <>
      <Flex w="full" alignItems="center" justifyContent="center" gap={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input {...register("name")} placeholder="Name" />
        </FormControl>

        <ImageUploader
          value={getValues().logo || null}
          onChange={(image) => setValue("logo", image)}
        />
      </Flex>

      <FormControl mt={4}>
        <FormLabel>Website</FormLabel>
        <Input type="url" {...register("website")} placeholder="Website" />
      </FormControl>
    </>
  );
};
