import { FormControl } from "@chakra-ui/react";
import { Control, RegisterOptions, useController } from "react-hook-form";
import MoneyInputBase from "./MoneyInputBase";

interface OwnProps {
  defaultValue: number;
  name: string;
  ariaLabel?: string;
  placeholder?: string;
  label?: string;
  control: Control<any, any>;
  register?: RegisterOptions;
}

const MoneyInput = ({
  defaultValue,
  name,
  control,
  ariaLabel,
  placeholder,
  label,
  register = {},
}: OwnProps): JSX.Element => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: register,
    defaultValue: defaultValue || 0,
  });

  const fieldProps: { "aria-label": string; placeholder?: string } = {
    "aria-label": ariaLabel || label || "",
    placeholder: placeholder,
  };

  if (label) {
    fieldProps.placeholder = "";
  }

  return (
    <FormControl>
      <MoneyInputBase {...inputProps} {...fieldProps} label={label} ref={ref} />
    </FormControl>
  );
};

export default MoneyInput;
