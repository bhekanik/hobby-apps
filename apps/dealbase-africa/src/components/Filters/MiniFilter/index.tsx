import { Flex } from "@chakra-ui/react";
import { countryList, sectors, stages } from "fixtures";
import dynamic from "next/dynamic";
import { useDeals } from "src/hooks";
import { isProd } from "src/lib/config";
import * as ga from "src/lib/googleAnalytics";
import { useStore } from "src/stores/dealflow";
import shallow from "zustand/shallow";

const CheckPicker = dynamic(
  () => import("src/components/FormElements/Inputs/MiniCheckPicker"),
  {
    ssr: false,
  }
);

const DatePicker = dynamic(
  () => import("src/components/FormElements/Inputs/MiniFilterDatePicker"),
  {
    ssr: false,
  }
);

export function MiniFilter() {
  const filter = useStore((state) => state.dealflow.filter, shallow);
  const setFilter = useStore((state) => state.setFilter, shallow);

  const { deals } = useDeals();

  function handleDateSelectChange(value: [Date, Date]) {
    setFilter(
      {
        ...filter,
        dateRange: { start: value[0], end: value[1] },
      },
      deals || []
    );
  }

  function handleCheckPickerClean(field: "country" | "sector" | "stage") {
    setFilter({ ...filter, [field]: ["All"] }, deals || []);
  }

  function handleCheckPickerChange(
    value: string[],
    field: "country" | "sector" | "stage"
  ) {
    const valueWithoutAll =
      value.length > 1 && value.includes("All")
        ? value.filter((v) => v !== "All")
        : value.length === 0
        ? ["All"]
        : value;

    if (isProd) {
      ga.event({
        action: "filter",
        params: {
          [field]: valueWithoutAll,
        },
      });
    }

    setFilter({ ...filter, [field]: valueWithoutAll }, deals || []);
  }

  return (
    <Flex flexDir="column" justifyContent="flex-start" w="full" gap={8}>
      <CheckPicker
        label="Country"
        flex={1}
        id="country"
        noBorder
        onChange={(value) => handleCheckPickerChange(value, "country")}
        onClean={() => handleCheckPickerClean("country")}
        placeholder="Select a country"
        value={filter.country}
        defaultValue={["All"]}
        isGrouped
        data={[
          { label: "All", value: "All" },
          ...countryList
            .sort((a, b) => a?.name.localeCompare(b?.name))
            .map(({ name, code }) => ({
              label: name,
              value: code,
            })),
        ]}
      />
      <CheckPicker
        label="Sector"
        flex={1}
        id="sector"
        noBorder
        onChange={(value) => handleCheckPickerChange(value, "sector")}
        onClean={() => handleCheckPickerClean("sector")}
        placeholder="Select a sector"
        value={filter.sector}
        defaultValue={["All"]}
        data={[
          { label: "All", value: "All" },
          ...sectors
            .sort((a, b) => a?.value.localeCompare(b?.value))
            .map(({ label, value }) => ({
              label,
              value,
            })),
        ]}
      />
      <CheckPicker
        label="Stage"
        flex={1}
        id="stage"
        noBorder
        onChange={(value) => handleCheckPickerChange(value, "stage")}
        onClean={() => handleCheckPickerClean("stage")}
        placeholder="Select a stage"
        value={filter.stage}
        defaultValue={["All"]}
        data={[
          { label: "All", value: "All" },
          ...stages
            .sort((a, b) => a?.value.localeCompare(b?.value))
            .map(({ label, value }) => ({
              label,
              value,
            })),
        ]}
      />
      <DatePicker
        id="date"
        label="Date"
        onOk={handleDateSelectChange}
        flex={1}
        value={[filter.dateRange.start, filter.dateRange.end]}
        noBorder
      />
    </Flex>
  );
}

export default MiniFilter;
