import { Flex, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";
import { Deal } from "types";

interface Props {
  register: UseFormRegister<Deal>;
}

export const DiversityFields = ({ register }: Props) => {
  return (
    <Flex gap={4} mb={2} flexDir={"column"}>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          Has female co-founder?
        </FormLabel>
        <Switch id="female_founder" {...register("company.female_founder")} />
      </FormControl>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          Has diverse founders?
        </FormLabel>
        <Switch
          id="diverse_founders"
          {...register("company.diverse_founders")}
        />
      </FormControl>
    </Flex>
  );
};
