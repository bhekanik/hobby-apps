import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  forwardRef,
  Input as ChakraInput,
  InputProps,
} from "@chakra-ui/react";
import { Control, RegisterOptions, useController } from "react-hook-form";

interface Props {
  helperText?: string;
  name: string;
  errorMessage?: string;
  ariaLabel?: string;
  placeholder?: string;
  control: Control<any, any>;
  register?: RegisterOptions;
}

type LabelProps =
  | {
      label?: never;
      id?: string;
    }
  | {
      label: string;
      id: string;
    };

const InputBase = ({
  helperText,
  errorMessage,
  ariaLabel,
  placeholder,
  label,
  control,
  register = {},
  name,
  ...otherProps
}: Props & Omit<InputProps, "label" | "id"> & LabelProps) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: register,
  });

  const fieldProps: { "aria-label": string; placeholder?: string } = {
    "aria-label": ariaLabel || label || "",
    placeholder: placeholder,
  };

  if (label) {
    fieldProps.placeholder = "";
  }

  return (
    <FormControl {...otherProps} variant="floating">
      <ChakraInput {...inputProps} {...fieldProps} ref={ref} />
      {/* It is important that the Label comes after the Control due to css selectors */}
      {label && <FormLabel htmlFor={otherProps.id}>{label}</FormLabel>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
