import { Grid, useMediaQuery } from "@chakra-ui/react";
import { ColumnInstance, UseSortByColumnProps } from "react-table";
import { SortButton } from "src/components/DataGrid/SortButton";

interface Props<T extends object> {
  columns: (ColumnInstance<T> & UseSortByColumnProps<T>)[];
}

export const SortButtons = <T extends object>({ columns }: Props<T>) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  return (
    <Grid
      gridTemplateColumns="repeat(auto-fit, minmax(100px, 1fr))"
      gap={2}
      alignItems="center"
      my={2}
      w="full"
      px={isLessThan768 ? 0 : 4}
    >
      {columns.map((header) => {
        const { key: columnKey, ...restOfColumnProps } = header.getHeaderProps(
          header.getSortByToggleProps()
        );

        return (
          <SortButton
            key={columnKey}
            column={header}
            columnProps={restOfColumnProps}
          />
        );
      })}
    </Grid>
  );
};
