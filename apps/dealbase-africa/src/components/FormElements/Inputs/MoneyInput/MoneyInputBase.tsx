import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  useNumberInput,
} from "@chakra-ui/react";
import * as React from "react";
import FormFieldLabel from "../../FormFieldLabel";

interface OwnProps {
  name?: string;
  onChange?: (value: number) => void;
  value?: number;
  placeholder?: string;
  label?: string;
}

type Props = OwnProps;

const MoneyInputBase: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref) => {
  const { onChange, value: inputValue, label, ...rest } = props;

  const handleChange = (valueAsString: string, valueAsNumber: number) => {
    let valueToSave: number = valueAsNumber || Number(valueAsString);
    if (isNaN(valueToSave)) valueToSave = 0;
    setValue(valueToSave);
  };

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1000.0,
      precision: 2,
      onChange: handleChange,
      value: inputValue,
      isReadOnly: false,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({});

  const [value, setValue] = React.useState<number>(inputValue || 0);

  React.useEffect(() => {
    onChange && onChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <HStack>
      {label && (
        <FormFieldLabel pl="2" w="30%">
          {label}
        </FormFieldLabel>
      )}
      <Button {...dec}>-</Button>
      <InputGroup>
        <InputLeftAddon>{"$"}</InputLeftAddon>
        <Input ref={ref} {...rest} {...input} />
      </InputGroup>
      <Button {...inc}>+</Button>
    </HStack>
  );
};

export default React.forwardRef(MoneyInputBase);
