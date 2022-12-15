import { Button, ModalFooter } from "@chakra-ui/react";

export interface ModalActionFooterProps {
  isLoading: boolean;
  onClose: () => void;
}

export const ModalActionFooter = ({
  isLoading,
  onClose,
}: ModalActionFooterProps) => {
  return (
    <ModalFooter>
      <Button
        isLoading={isLoading}
        loadingText="Submitting"
        type="submit"
        colorScheme="green"
        mr={3}
      >
        Save
      </Button>
      <Button onClick={onClose}>Cancel</Button>
    </ModalFooter>
  );
};
