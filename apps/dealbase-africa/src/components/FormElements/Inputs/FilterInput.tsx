import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input as ChakraInput,
  InputProps,
} from "@chakra-ui/react";

interface Props {
  helperText?: string;
  errorMessage?: string;
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

export const Input = ({
  helperText,
  errorMessage,
  label,
  ...otherProps
}: Props & Omit<InputProps, "label" | "id"> & LabelProps) => {
  return (
    <FormControl variant="floating">
      <ChakraInput {...otherProps} />
      {/* It is important that the Label comes after the Control due to css selectors */}
      {label && <FormLabel htmlFor={otherProps.id}>{label}</FormLabel>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};
