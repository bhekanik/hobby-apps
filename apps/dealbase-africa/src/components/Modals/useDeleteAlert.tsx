import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ComponentType, memo, useRef } from "react";
import { EntryType, useDeleteEntry } from "src/hooks/useDeleteEntry";
import { CrowdsourcedDeal } from "src/pages/api/crowdsourced_deal";
import { Company, Deal, Investor } from "types";

export type Entry = Deal | Investor | Company | CrowdsourcedDeal;

export interface DeleteAlertBaseProps {
  entryType: EntryType;
  entry?: Entry;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  resetSelectedEntry?: () => void;
}

const DeleteAlertBase = ({
  entryType,
  entry,
  onClose,
  isOpen,
  resetSelectedEntry,
}: DeleteAlertBaseProps) => {
  const cancelRef = useRef(null);

  const handleClose = () => {
    if (resetSelectedEntry) {
      resetSelectedEntry();
    }
    onClose();
  };

  const { deleteEntry } = useDeleteEntry(entryType, handleClose);

  const handleDelete = async () => {
    if (entry) {
      await deleteEntry(entry.id);
    }

    handleClose();
  };

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Entry?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {`Are you sure you want to delete `}
            <Text as="span" fontWeight="bold" color="red.500">
              {(entry as Investor | Company)?.name ??
                `the ${(entry as Deal)?.company.name} - ${(
                  (entry as Deal)?.investors as string[]
                ).join(", ")} deal`}
            </Text>
            {`? One entry will be
            deleted.`}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleDelete}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

const DeleteAlert = memo(DeleteAlertBase);

export const useDeleteAlert = (): Pick<
  ReturnType<typeof useDisclosure>,
  "onOpen" | "isOpen"
> & {
  DeleteAlert: ComponentType<
    Partial<DeleteAlertBaseProps> & { entryType: EntryType }
  >;
} => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return {
    onOpen,
    isOpen,
    DeleteAlert: (props) => (
      <DeleteAlert
        {...props}
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
      />
    ),
  };
};
