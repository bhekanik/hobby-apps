import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ComponentType, useRef } from "react";
import { InvestorsForm } from "src/components/Forms/InvestorsForm";
import { Investor } from "types";
import { ModalActionFooter } from "./ModalActionFooter";

export interface InvestorsModalProps {
  investor?: Investor;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  resetSelectedInvestor?: () => void;
}

export const InvestorsModal = ({
  investor,
  onClose,
  isOpen,
  resetSelectedInvestor,
}: InvestorsModalProps) => {
  const initialRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    if (resetSelectedInvestor) resetSelectedInvestor();
    onClose();
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Investor</ModalHeader>
        <ModalCloseButton />

        <InvestorsForm
          onDone={handleClose}
          initialRef={initialRef}
          investor={investor}
          renderActions={(isLoading: boolean) => (
            <ModalActionFooter isLoading={isLoading} onClose={handleClose} />
          )}
        />
      </ModalContent>
    </Modal>
  );
};

export const useInvestorsModal = (): Pick<
  ReturnType<typeof useDisclosure>,
  "onOpen"
> & { InvestorsModal: ComponentType<Partial<InvestorsModalProps>> } => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return {
    onOpen,
    InvestorsModal: (props) => (
      <InvestorsModal
        {...props}
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
      />
    ),
  };
};
