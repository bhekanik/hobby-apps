import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  FlexProps,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";

interface Props {
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageOptions: number[];
  pageCount: number;
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (pageSize: number) => void;
  pageIndex: number;
  pageSize: number;
  showPageSizeOptions?: boolean;
  showGotoPage?: boolean;
  pageLabel?: string;
}

export const Pagination = ({
  canPreviousPage,
  showPageSizeOptions = true,
  showGotoPage = true,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  pageLabel,
  pageIndex,
  pageSize,
  ...otherProps
}: Props & FlexProps) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  return pageCount > 1 ? (
    <Flex
      justifyContent="space-between"
      my={4}
      alignItems="center"
      w="full"
      {...otherProps}
    >
      <Flex>
        <Tooltip label="First Page">
          <IconButton
            size={isLessThan768 ? "sm" : "md"}
            aria-label="First Page"
            onClick={() => gotoPage(0)}
            isDisabled={!canPreviousPage}
            icon={<ArrowLeftIcon h={3} w={3} />}
            mr={4}
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            size={isLessThan768 ? "sm" : "md"}
            aria-label="Previous Page"
            onClick={previousPage}
            isDisabled={!canPreviousPage}
            icon={<ChevronLeftIcon h={6} w={6} />}
          />
        </Tooltip>
      </Flex>

      <Flex
        flexDir={isLessThan768 ? "column" : "row"}
        gap={2}
        alignItems="center"
        mx={isLessThan768 ? 2 : 0}
      >
        <Text align="center" flexShrink={0} mr={isLessThan768 ? 0 : 8}>
          {pageLabel ? (
            pageLabel
          ) : (
            <>
              Page{" "}
              <Text fontWeight="bold" as="span">
                {pageIndex + 1}
              </Text>{" "}
              of{" "}
              <Text fontWeight="bold" as="span">
                {pageOptions.length}
              </Text>
            </>
          )}
        </Text>
        {showGotoPage && (
          <>
            <Text flexShrink={0} m={0}>
              Go to page:
            </Text>{" "}
            <NumberInput
              ml={isLessThan768 ? 0 : 2}
              mr={isLessThan768 ? 0 : 8}
              w={isLessThan768 ? "full" : 28}
              min={1}
              max={pageOptions.length}
              onChange={(_, value) => {
                const page = value ? value - 1 : 0;
                gotoPage(page);
              }}
              defaultValue={pageIndex + 1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </>
        )}
        {showPageSizeOptions && (
          <Select
            w={isLessThan768 ? "full" : 32}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((ps) => (
              <option key={ps} value={ps}>
                Show {ps}
              </option>
            ))}
          </Select>
        )}
      </Flex>

      <Flex>
        <Tooltip label="Next Page">
          <IconButton
            size={isLessThan768 ? "sm" : "md"}
            aria-label="Next Page"
            onClick={nextPage}
            isDisabled={!canNextPage}
            icon={<ChevronRightIcon h={6} w={6} />}
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            size={isLessThan768 ? "sm" : "md"}
            aria-label="Last Page"
            onClick={() => gotoPage(pageCount - 1)}
            isDisabled={!canNextPage}
            icon={<ArrowRightIcon h={3} w={3} />}
            ml={4}
          />
        </Tooltip>
      </Flex>
    </Flex>
  ) : null;
};
