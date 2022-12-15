import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select as ChakraSelect,
} from "@chakra-ui/react";
import { forwardRef, PropsWithChildren } from "react";
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

export const SelectBase = ({
  helperText,
  errorMessage,
  ariaLabel,
  placeholder,
  label,
  control,
  register = {},
  name,
  children,
  ...otherProps
}: PropsWithChildren<
  Props & Omit<FormControlProps, "label" | "id"> & LabelProps
>) => {
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
      <ChakraSelect {...inputProps} {...fieldProps} ref={ref}>
        {children}
      </ChakraSelect>
      {/* It is important that the Label comes after the Control due to css selectors */}
      {label && <FormLabel htmlFor={otherProps.id}>{label}</FormLabel>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export const Select = forwardRef(SelectBase);
