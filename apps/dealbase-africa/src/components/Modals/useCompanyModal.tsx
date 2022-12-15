import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ComponentType, useRef } from "react";
import { CompaniesForm } from "src/components/Forms/CompaniesForm";
import { Company } from "types";
import { ModalActionFooter } from "./ModalActionFooter";

export interface CompanyModalProps {
  company?: Company;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  resetSelectedCompany?: () => void;
}

export const CompanyModal = ({
  company,
  onClose,
  isOpen,
  resetSelectedCompany,
}: CompanyModalProps) => {
  const initialRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    if (resetSelectedCompany) resetSelectedCompany();
    onClose();
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Company</ModalHeader>
        <ModalCloseButton />

        <CompaniesForm
          onDone={handleClose}
          initialRef={initialRef}
          company={company}
          renderActions={(isLoading: boolean) => (
            <ModalActionFooter isLoading={isLoading} onClose={handleClose} />
          )}
        />
      </ModalContent>
    </Modal>
  );
};

export const useCompanyModal = (): Pick<
  ReturnType<typeof useDisclosure>,
  "onOpen"
> & { CompanyModal: ComponentType<Partial<CompanyModalProps>> } => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return {
    onOpen,
    CompanyModal: (props) => (
      <CompanyModal
        {...props}
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
      />
    ),
  };
};
