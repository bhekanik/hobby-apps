import { CloseIcon } from "@chakra-ui/icons";
import { Flex, Text, useColorMode, useMediaQuery } from "@chakra-ui/react";
import debounce from "debounce";
import { Dispatch, RefObject, SetStateAction, useMemo, useRef } from "react";
import {
  AutoComplete,
  CustomProvider as RSuiteProvider,
  InputGroup,
  PickerHandle,
} from "rsuite";
import { CloudinaryImage } from "shared-components";
import { useStore } from "src/stores/dealflow";
import { Deal } from "types";
import shallow from "zustand/shallow";

interface Props {
  tableRef: RefObject<HTMLDivElement>;
  showClearButton: boolean;
  setShowClearButton: Dispatch<SetStateAction<boolean>>;
  autocompleteValue: string;
  setAutocompleteValue: Dispatch<SetStateAction<string>>;
  clearAutocomplete: () => void;
  deals: Deal[];
}

export const CompanySearchInput = ({
  tableRef,
  showClearButton,
  setShowClearButton,
  autocompleteValue,
  setAutocompleteValue,
  clearAutocomplete,
  deals,
}: Props) => {
  const setSearchTerm = useStore((state) => state.setSearchTerm, shallow);

  function handleSelect(value: string) {
    setSearchTerm(value);
    tableRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const [isLessThan960] = useMediaQuery("(max-width: 960px)");

  const { colorMode } = useColorMode();

  const companyLogos = useMemo(() => {
    return deals?.reduce<Record<string, string>>((acc, deal) => {
      if (!deal.company) {
        return acc;
      }
      return {
        ...acc,
        [deal?.company.name]: deal?.company.logo?.cloudinary_public_id || "",
      };
    }, {});
  }, [deals]);

  const inputRef = useRef<PickerHandle | null>(null);

  return (
    <InputGroup
      inside
      style={{
        outlineColor: "#D98F39",
        flex: 1,
        marginTop: !isLessThan960 ? "-16px" : "",
      }}
    >
      <InputGroup.Addon style={{ fontWeight: "bold" }}>Or</InputGroup.Addon>
      <RSuiteProvider theme={colorMode}>
        <AutoComplete
          size="lg"
          ref={inputRef}
          onChange={(value) => {
            value === "" ? setShowClearButton(false) : setShowClearButton(true);
            setAutocompleteValue(value);
          }}
          value={autocompleteValue}
          placeholder="Search by Company"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          data={[...new Set(deals?.map((deal) => deal.company.name) || [])]}
          onSelect={debounce(handleSelect, 300)}
          renderMenuItem={(item) => {
            return (
              <Flex alignItems="center" gap={2}>
                {companyLogos?.[item as string] && (
                  <CloudinaryImage
                    publicId={companyLogos[item as string] || ""}
                    imageWidth={32}
                    alt="Logo"
                    d="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="white"
                    p={0}
                  />
                )}
                <Text
                  color="teal.500"
                  _dark={{
                    color: "teal.100",
                  }}
                >
                  {item}
                </Text>
              </Flex>
            );
          }}
        />
      </RSuiteProvider>

      {showClearButton && (
        <InputGroup.Button
          onClick={() => {
            inputRef.current?.root?.querySelector("input")?.focus();
            clearAutocomplete();
          }}
        >
          <CloseIcon fontSize={12} />
        </InputGroup.Button>
      )}
    </InputGroup>
  );
};

export default CompanySearchInput;
