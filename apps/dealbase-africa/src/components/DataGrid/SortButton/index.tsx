import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import {
  ColumnInstance,
  TableHeaderProps,
  UseSortByColumnProps,
} from "react-table";
import { isProd } from "src/lib/config";
import * as ga from "src/lib/googleAnalytics";

interface Props<T extends object> {
  column: ColumnInstance<T> & UseSortByColumnProps<T>;
  columnProps: Omit<TableHeaderProps, "key">;
}

export const SortButton = <T extends object>({
  column,
  columnProps,
}: Props<T>) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { onClick, ...restOfColumnProps } = columnProps;

  const notifyGoogleAnalytics = (columnId: string) => {
    if (isProd) {
      ga.event({
        action: "sort",
        params: {
          sortField: columnId,
        },
      });
    }
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);
    notifyGoogleAnalytics(column.id);
  };

  return (
    <Button
      size={isLessThan768 ? "sm" : "xs"}
      onClick={handleClick}
      {...restOfColumnProps}
    >
      <Flex gap={1}>
        <Text>{column.render("Header")}</Text>
        <span>
          {column.isSorted ? (
            column.isSortedDesc ? (
              <ArrowDownIcon />
            ) : (
              <ArrowUpIcon />
            )
          ) : (
            ""
          )}
        </span>
      </Flex>
    </Button>
  );
};
