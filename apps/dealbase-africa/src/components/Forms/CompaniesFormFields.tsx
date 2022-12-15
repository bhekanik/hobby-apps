import {
  Flex,
  FormControl,
  FormLabel,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { countryList, sectors } from "fixtures";
import { useEffect } from "react";
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  CheckPicker as RSCheckPicker,
  CustomProvider as RSuiteProvider,
} from "rsuite";
import { Company } from "types";
import { Input } from "../FormElements/Inputs/Input";
import { Select } from "../FormElements/Inputs/Select";
import { ImageUploader } from "../ImageUploader";

interface Props {
  register: UseFormRegister<Company>;
  getValues: UseFormGetValues<Company>;
  setValue: UseFormSetValue<Company>;
  control: Control<Company, object>;
  watch: UseFormWatch<Company>;
}

export const CompaniesFormFields = ({
  register,
  getValues,
  setValue,
  control,
  watch,
}: Props) => {
  const { colorMode } = useColorMode();

  useEffect(() => {
    register("logo");
  }, [register]);

  function handleCheckPickerChange(value: string[], field: "sector") {
    const stringValue = Array.isArray(value)
      ? JSON.stringify(value)
      : JSON.stringify([value]);
    return setValue(field, stringValue);
  }

  return (
    <>
      <Flex mb={4} w="full" alignItems="center" justifyContent="center" gap={4}>
        <Input
          label="Name"
          id="name"
          name="name"
          control={control as Control<any, any>}
          placeholder="Name"
        />

        <ImageUploader
          value={getValues().logo || null}
          onChange={(image) => setValue("logo", image)}
        />
      </Flex>

      <Select
        control={control as Control<any, any>}
        mb={4}
        id="country"
        name="country"
        label="Country"
      >
        {countryList.map(({ name, code }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </Select>

      <FormControl mb={6}>
        <FormLabel>sector</FormLabel>

        <FormControl>
          <RSuiteProvider theme={colorMode}>
            <RSCheckPicker
              sticky
              style={{ width: "100%" }}
              appearance="default"
              preventOverflow
              placeholder="Select industries"
              searchable={false}
              cleanable
              onClean={() => setValue("sector", "[]")}
              data={(sectors ?? [])
                .sort((a, b) => (a.label > b.label ? 1 : -1))
                .map(({ label }) => {
                  return {
                    label: label,
                    value: label,
                  };
                })}
              value={
                watch("sector")?.includes("[")
                  ? JSON.parse(watch("sector"))
                  : JSON.parse(`["${watch("sector") ?? ""}"]`)
              }
              onSelect={(value) => handleCheckPickerChange(value, "sector")}
            />
          </RSuiteProvider>
        </FormControl>
      </FormControl>

      <Input
        mb={4}
        type="number"
        min={1980}
        max={3000}
        control={control as Control<any, any>}
        maxLength={4}
        name="launch_year"
        placeholder="Launch Year"
        label="Launch Year"
        id="launch_year"
      />

      <Input
        mb={2}
        label="Website"
        control={control as Control<any, any>}
        id="website"
        type="url"
        name="website"
        placeholder="Website"
      />

      <FormControl>
        <FormLabel>About</FormLabel>
        <Textarea {...register("about")} placeholder="About" />
      </FormControl>
    </>
  );
};
