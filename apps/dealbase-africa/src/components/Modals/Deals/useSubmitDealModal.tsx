import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { stages } from "fixtures";
import { ComponentType, FormEvent, memo, useMemo, useRef } from "react";
import { useSaveCrowdsourcedDeal } from "src/hooks/useSaveCrowdsoucedDeal";
import { CrowdsourcedDeal } from "src/pages/api/crowdsourced_deal";

export interface SubmitDealModalProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export const SubmitDealModalBase = ({
  onClose,
  isOpen,
}: SubmitDealModalProps) => {
  const initialRef = useRef<HTMLInputElement>(null);
  const { saveCrowdsourcedDeal, isLoading } = useSaveCrowdsourcedDeal(onClose);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = Object.fromEntries(
      formData
    ) as unknown as CrowdsourcedDeal;

    await saveCrowdsourcedDeal(formValues);
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Submit a deal</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Text as="p" mb={2}>
            {`Is there a deal that we missed? Let us know and we'll add it to the list.`}
          </Text>
          <form id="submitDealForm" onSubmit={handleSubmit}>
            <FormControl mt={4}>
              <Input
                ref={initialRef}
                isRequired
                name="company_name"
                placeholder="Company Name"
              />
            </FormControl>
            <FormControl mt={4}>
              <Input
                name="sector"
                placeholder="Sector (e.g. FinTech, Retail, etc.)"
              />
            </FormControl>
            <FormControl mt={4}>
              <Input type="email" isRequired name="email" placeholder="Email" />
            </FormControl>
            <FormControl mt={4}>
              <Input
                type="url"
                isRequired
                name="press_release_link"
                placeholder="Press Release Link"
              />
            </FormControl>
            <FormControl mt={4}>
              <Input
                type="date"
                isRequired
                name="press_release_date"
                placeholder="Press Release Date"
              />
            </FormControl>
            <FormControl mt={4}>
              <Input
                type="number"
                isRequired
                name="amount"
                placeholder="Amount"
              />
            </FormControl>
            <FormControl mt={4}>
              <Select name="stage" id="stage" isRequired>
                {stages.map(({ label, value }) => (
                  <option key={label} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <Textarea isRequired name="investor" placeholder="Investor(s)" />
            </FormControl>
            <FormControl mt={4}>
              <Textarea name="additional_info" placeholder="Additional Info" />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={isLoading}
            loadingText="Submitting"
            type="submit"
            form="submitDealForm"
            colorScheme="green"
            mr={3}
          >
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const SubmitDealModal = memo(SubmitDealModalBase);

export const useSubmitDealModal = (): Pick<
  ReturnType<typeof useDisclosure>,
  "onOpen" | "isOpen"
> & {
  SubmitDealModal: ComponentType;
} => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const value = useMemo(
    () => ({
      onOpen,
      isOpen,
      SubmitDealModal: () => (
        <SubmitDealModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
      ),
    }),
    [isOpen, onOpen, onClose]
  );

  return value;
};
