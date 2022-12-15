import {
  Flex,
  FlexProps,
  Radio,
  RadioGroup,
  Select,
  Text,
} from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { ChangeEvent } from "react";
import { useStore } from "src/stores/dealflow";
import shallow from "zustand/shallow";

interface Props {
  type?: "Select" | "Radio";
}

export const CompareOffsetPicker = ({
  type = "Radio",
  ...flexProps
}: Props & FlexProps) => {
  const { setCompareOffset, compareOffset } = useStore(
    (state) => ({
      setCompareOffset: state.setCompareOffset,
      compareOffset: state.compareOffset,
    }),
    shallow
  );

  const handleChange = (newDuration: Duration) => {
    setCompareOffset(newDuration);
  };

  return (
    <Flex alignItems="center" gap={2} {...flexProps}>
      <Text whiteSpace="nowrap">Compare With:</Text>
      {type ? (
        <RadioGroup
          size="sm"
          value={Object.keys(compareOffset)[0]}
          onChange={(nextValue) => handleChange({ [nextValue]: 1 })}
          d="flex"
          gap={2}
        >
          <Radio value="years">Last Year</Radio>
          <Radio value="months">Last Month</Radio>
        </RadioGroup>
      ) : (
        <Select
          size="sm"
          value={Object.keys(compareOffset)[0]}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleChange({ [e.target.value]: 1 })
          }
          d="flex"
          gap={2}
        >
          <option value="years">Last Year</option>
          <option value="months">Last Month</option>
        </Select>
      )}
    </Flex>
  );
};
