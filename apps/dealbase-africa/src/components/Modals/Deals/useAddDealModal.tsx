import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ComponentType, memo, useRef } from "react";
import { AddDealForm } from "src/components/Forms/Deals/AddDealForm";
import { Deal } from "types";
import { ModalActionFooter } from "../ModalActionFooter";

export interface AddDealModalProps {
  deal?: Deal;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  resetSelectedDeal?: () => void;
}

export const AddDealModalBase = ({
  deal,
  onClose,
  isOpen,
  resetSelectedDeal,
}: AddDealModalProps) => {
  const initialRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    if (resetSelectedDeal) {
      resetSelectedDeal();
    }
    onClose();
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={handleClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Deal</ModalHeader>
        <ModalCloseButton />

        <AddDealForm
          onDone={handleClose}
          initialRef={initialRef}
          deal={deal}
          renderActions={(isLoading) => (
            <ModalActionFooter isLoading={isLoading} onClose={handleClose} />
          )}
        />
      </ModalContent>
    </Modal>
  );
};

const AddDealModal = AddDealModalBase;

export const useAddDealModal = (): Pick<
  ReturnType<typeof useDisclosure>,
  "onOpen" | "isOpen" | "onClose"
> & { AddDealModal: ComponentType<Partial<AddDealModalProps>> } => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return {
    onOpen,
    isOpen,
    onClose,
    // eslint-disable-next-line react/display-name
    AddDealModal: memo((props) => {
      return (
        <AddDealModal
          {...props}
          onClose={onClose}
          onOpen={onOpen}
          isOpen={isOpen}
        />
      );
    }),
  };
};
