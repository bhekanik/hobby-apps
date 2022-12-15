import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ComponentType, useRef } from "react";
import { CrowdsourcedDeal } from "src/pages/api/crowdsourced_deal";

export interface CrowdsourcedDealsModalProps {
  crowdsourcedDeal?: CrowdsourcedDeal;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  resetSelectedCrowdsourcedDeal?: () => void;
}

export const CrowdsourcedDealsModal = ({
  onClose,
  isOpen,
  resetSelectedCrowdsourcedDeal,
}: CrowdsourcedDealsModalProps) => {
  const initialRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    if (resetSelectedCrowdsourcedDeal) resetSelectedCrowdsourcedDeal();
    onClose();
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Crowdsourced Deal</ModalHeader>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export const useCrowdsourcedDealsModal = (): Pick<
  ReturnType<typeof useDisclosure>,
  "onOpen"
> & {
  CrowdsourcedDealsModal: ComponentType<Partial<CrowdsourcedDealsModalProps>>;
} => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return {
    onOpen,
    CrowdsourcedDealsModal: (props) => (
      <CrowdsourcedDealsModal
        {...props}
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
      />
    ),
  };
};
