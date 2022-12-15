import { Icon, IconButton, Tooltip, useMediaQuery } from "@chakra-ui/react";
import { IoGridOutline } from "react-icons/io5";
import { VscTable } from "react-icons/vsc";
import { DataViewType } from "types";

interface Props {
  onChangeDataViewType: (newDataViewType: DataViewType) => void;
  dataViewType: DataViewType;
}

export const DataViewToggle = ({
  onChangeDataViewType,
  dataViewType,
}: Props) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  return !isLessThan768 ? (
    <Tooltip
      label={`Switch to ${dataViewType === "grid" ? "table" : "grid"} view`}
    >
      <IconButton
        name="view toggle"
        role="button"
        size={isLessThan768 ? "lg" : "md"}
        aria-label="Toggle data view"
        icon={
          <Icon
            as={dataViewType === "grid" ? VscTable : IoGridOutline}
            fontSize={24}
          />
        }
        onClick={() =>
          onChangeDataViewType(dataViewType === "grid" ? "table" : "grid")
        }
      />
    </Tooltip>
  ) : null;
};
