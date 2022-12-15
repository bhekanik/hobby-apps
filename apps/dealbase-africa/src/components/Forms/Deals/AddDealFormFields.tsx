import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
  useColorMode,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { countryList, defaultCompany, sectors, stages } from "fixtures";
import { ChangeEvent, FormEvent } from "react";
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  CheckPicker as RSCheckPicker,
  CustomProvider as RSuiteProvider,
} from "rsuite";
import MoneyInput from "src/components/FormElements/Inputs/MoneyInput";
import { ImageUploader } from "src/components/ImageUploader";
import { useCompanies, useInvestors } from "src/hooks";
import { Company, Deal } from "types";
import { DiversityFields } from "./fragments/DiversityFields";

interface Props {
  register: UseFormRegister<Deal>;
  control: Control<Deal, object>;
  getValues: UseFormGetValues<Deal>;
  setValue: UseFormSetValue<Deal>;
  watch: UseFormWatch<Deal>;
}

export const AddDealFormFields = ({
  register,
  control,
  getValues,
  setValue,
  watch,
}: Props) => {
  const { companies } = useCompanies();
  const { investors } = useInvestors();
  const { colorMode } = useColorMode();

  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  const {
    isOpen: createNewCompanyIsOpen,
    onOpen: onNewCompanyOpen,
    onClose: onNewCompanyClose,
  } = useDisclosure();

  const {
    isOpen: createNewInvestorIsOpen,
    onOpen: onNewInvestorOpen,
    onClose: onNewInvestorClose,
  } = useDisclosure();

  const toggleAddInvestor = () => {
    setValue("investors", []);

    createNewInvestorIsOpen ? onNewInvestorClose() : onNewInvestorOpen();
  };

  const toggleAddCompany = () => {
    setValue("company.name", "");
    setValue("company.launch_year", "");
    setValue("company.country", "");
    setValue("company.female_founder", false);
    setValue("company.diverse_founders", false);
    setValue("company.website", "");
    setValue("company.about", "");
    setValue("company.sector", "[]");
    setValue("company.id", 0);

    createNewCompanyIsOpen ? onNewCompanyClose() : onNewCompanyOpen();
  };

  const handleCompaniesSelectInput = (e: FormEvent) => {
    const { value } = e.target as HTMLSelectElement;

    if (value !== "") {
      const c = companies?.find((c) => c.id === Number(value));
      if (c) {
        defaultCompany.name = c.name;
        defaultCompany.launch_year = c.launch_year;
        defaultCompany.country = c.country;
        defaultCompany.female_founder = c.female_founder;
        defaultCompany.diverse_founders = c.diverse_founders;
        defaultCompany.website = c.website;
        defaultCompany.sector = c.sector;
        defaultCompany.about = c.about;
      }
    }

    setValue("company.name", defaultCompany.name);
    setValue("company.launch_year", defaultCompany.launch_year);
    setValue("company.country", defaultCompany.country);
    setValue("company.female_founder", defaultCompany.female_founder);
    setValue("company.diverse_founders", defaultCompany.diverse_founders);
    setValue("company.sector", defaultCompany.sector);
    setValue("company.website", defaultCompany.website);
    setValue("company.about", defaultCompany.about);

    value === "" ? onNewCompanyClose() : onNewCompanyOpen();
  };

  function handleCheckPickerChange(
    value: string[],
    field: "company.sector" | "investors"
  ) {
    if (field === "company.sector") {
      const stringValue = Array.isArray(value)
        ? JSON.stringify(value)
        : JSON.stringify([value]);
      return setValue(field, stringValue);
    }

    return setValue(field, value);
  }

  const handleAddInvestors = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    let investors: string[] = [];
    if (value) {
      investors = value.split(",");
    }
    setValue("investors", investors);
  };

  return (
    <>
      <Text as="h4" color="green.300" fontWeight="bold" fontSize={18} mb={4}>
        Company
      </Text>
      <Flex alignItems="center" gap={2}>
        <FormControl>
          <Select
            onInput={handleCompaniesSelectInput}
            placeholder="Select a company"
            title="Select a company"
            {...register("company.id", { required: true })}
          >
            {companies
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map(({ name, id }: Company) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
          </Select>
        </FormControl>
        <Button size="md" onClick={toggleAddCompany}>
          {createNewCompanyIsOpen ? (
            <CloseIcon fontSize={16} color="red" />
          ) : (
            <AddIcon fontSize={16} />
          )}
        </Button>
      </Flex>

      <Collapse
        in={createNewCompanyIsOpen || Boolean(getValues("company.name"))}
        animateOpacity
      >
        <Box p={4}>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            w="full"
            gap={4}
            mb={2}
          >
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input {...register("company.name")} placeholder="Name" />
            </FormControl>
            <ImageUploader
              value={getValues("company.logo") || null}
              onChange={(image) => {
                setValue("company.logo", image);
              }}
            />
          </Flex>

          <Flex gap={4} mb={2} flexDir={isLessThan768 ? "column" : "row"}>
            <FormControl>
              <FormLabel>Launch Year</FormLabel>
              <Input
                type="number"
                min={1980}
                max={3000}
                {...register("company.launch_year")}
                placeholder="Launch Year"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select
                title="Select a country"
                placeholder="Country"
                {...register("company.country")}
              >
                {countryList
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map(({ name, code }) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </Flex>

          <DiversityFields register={register} />

          <FormControl mb={2}>
            <FormLabel>Sector</FormLabel>

            <FormControl>
              <RSuiteProvider theme={colorMode}>
                <RSCheckPicker
                  sticky
                  style={{ width: "100%" }}
                  appearance="default"
                  preventOverflow
                  placeholder="Select industries"
                  searchable={false}
                  cleanable
                  onClean={() => setValue("company.sector", "[]")}
                  data={(sectors ?? [])
                    .sort((a, b) => (a.label > b.label ? 1 : -1))
                    .map(({ label }) => {
                      return {
                        label: label,
                        value: label,
                      };
                    })}
                  value={
                    watch("company.sector")?.includes("[")
                      ? JSON.parse(watch("company.sector"))
                      : JSON.parse(`["${watch("company.sector")}"]`)
                  }
                  onSelect={(value) =>
                    handleCheckPickerChange(value, "company.sector")
                  }
                />
              </RSuiteProvider>
            </FormControl>
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>Website</FormLabel>
            <Input
              type="url"
              {...register("company.website")}
              placeholder="Website"
            />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>About</FormLabel>
            <Textarea {...register("company.about")} placeholder="About" />
          </FormControl>
        </Box>
      </Collapse>

      <Text as="h4" color="green.300" fontWeight="bold" fontSize={18} my={4}>
        Deal
      </Text>
      <FormControl>
        <FormLabel>Stage</FormLabel>
        <Select
          placeholder="Select a stage"
          title="Select a stage"
          {...register("stage", { required: true })}
        >
          {stages.map((stage) => (
            <option key={stage.value} value={stage.value}>
              {stage.label}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={2}>
        <FormLabel>Amount</FormLabel>
        <MoneyInput
          control={control as Control<any, any>}
          defaultValue={getValues("amount")}
          name="amount"
        />
      </FormControl>

      <Text fontSize={18}>Press Release</Text>
      <Flex gap={4} my={3} flexDir={isLessThan768 ? "column" : "row"}>
        <FormControl>
          <Input
            // ref={initialRef}
            placeholder="Link"
            {...register("press_release.link")}
            type="url"
          />
        </FormControl>

        <FormControl>
          <Input
            {...register("press_release.date")}
            placeholder="Press Release"
            type="date"
          />
        </FormControl>
      </Flex>

      <FormLabel>Investor</FormLabel>
      <Flex alignItems="center" gap={2}>
        <FormControl>
          <RSuiteProvider theme={colorMode}>
            <RSCheckPicker
              sticky
              style={{ width: "100%" }}
              appearance="default"
              preventOverflow
              placeholder={"Select investors"}
              cleanable
              onClean={() => setValue("investors", [])}
              data={[
                ...new Set(
                  (investors ?? [])
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map(({ name }) => name)
                ),
              ].map((name) => {
                return {
                  label: name,
                  value: name,
                  group: name.at?.(0)?.toUpperCase() || "",
                };
              })}
              groupBy="group"
              value={watch("investors")}
              onSelect={(value) => handleCheckPickerChange(value, "investors")}
            />
          </RSuiteProvider>
        </FormControl>
        <Button size="md" onClick={toggleAddInvestor}>
          {createNewInvestorIsOpen ? (
            <CloseIcon fontSize={16} color="red" />
          ) : (
            <AddIcon fontSize={16} />
          )}
        </Button>
      </Flex>

      <Collapse in={createNewInvestorIsOpen} animateOpacity>
        <Box display="flex" gap={4} alignItems="center" p={4} color="white">
          <FormControl>
            <FormLabel>Investors</FormLabel>
            <Textarea
              onChange={handleAddInvestors}
              placeholder="Investors (Comma Separated)"
            />
          </FormControl>
        </Box>
      </Collapse>
    </>
  );
};
