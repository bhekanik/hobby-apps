import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ComponentType, memo, useRef } from "react";
import { EditDealForm } from "src/components/Forms/Deals/EditDealForm";
import { Deal } from "types";
import { ModalActionFooter } from "../ModalActionFooter";

export interface EditDealModalProps {
  deal?: Deal;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  resetSelectedDeal?: () => void;
}

export const EditDealModalBase = ({
  deal,
  onClose,
  isOpen,
  resetSelectedDeal,
}: EditDealModalProps) => {
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
        <ModalHeader>Edit Deal</ModalHeader>
        <ModalCloseButton />

        <EditDealForm
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

const EditDealModal = memo(EditDealModalBase);

export const useEditDealModal = (): Pick<
  ReturnType<typeof useDisclosure>,
  "onOpen" | "isOpen" | "onClose"
> & { EditDealModal: ComponentType<Partial<EditDealModalProps>> } => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return {
    onOpen,
    isOpen,
    onClose,
    EditDealModal: (props) => {
      return (
        <EditDealModal
          {...props}
          onClose={onClose}
          onOpen={onOpen}
          isOpen={isOpen}
        />
      );
    },
  };
};
