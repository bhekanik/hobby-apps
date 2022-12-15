import {
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ComponentType, FormEvent, memo, useRef } from "react";
import { useSaveSubscriber } from "src/hooks/useSaveSubscriber";
import { Subscriber } from "src/pages/api/subscribers";

export type Type = "investor" | "founder";

export interface SubscribeModalProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  type: Type;
}

export const SubscribeModalBase = ({
  onClose,
  isOpen,
  type,
}: SubscribeModalProps) => {
  const initialRef = useRef<HTMLInputElement>(null);
  const { saveSubscriber, isLoading } = useSaveSubscriber(onClose);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData);
    const newSubscriber = {
      ...formValues,
      type,
    };

    await saveSubscriber(newSubscriber as Subscriber);
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Email List Signup</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Text as="p" mb={2}>
            {type === "founder"
              ? `On average, investors will spend less than 4 minutes reviewing your pitch deck... you can't afford to make a bad impression!`
              : `Finding and vetting African startup opportunities is one of the biggest challenges for investors. Poorly constructed pitch decks, messy applications, founders not matching your criteria… sound familiar?
`}
          </Text>
          <Text as="p" mb={2}>
            {type === "founder"
              ? `Rather, use our Deck-Builder to create the best deck possible, and get matched to the right investors for your startup. Sign up for early access here.`
              : `Rather, use our Deal-Flow tool to discover the best startups that match your requirements. Whether you're an Angel, VC fund or investor interested in African tech, sign up for early access here.`}
          </Text>
          <form id="emailListSignup" onSubmit={handleSubmit}>
            <FormControl mt={4}>
              <Input
                ref={initialRef}
                type="email"
                isRequired
                name="email"
                placeholder="Email"
              />
            </FormControl>
            <Flex gap={2} mt={4}>
              <FormControl>
                <Input type="text" name="firstname" placeholder="First Name" />
              </FormControl>
              <FormControl>
                <Input type="text" name="lastname" placeholder="Last Name" />
              </FormControl>
            </Flex>
            <FormControl mt={4}>
              <Input type="text" name="company" placeholder="Company" />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={isLoading}
            loadingText="Submitting"
            type="submit"
            form="emailListSignup"
            colorScheme="green"
            mr={3}
          >
            Sign Up
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const SubscribeModal = memo(SubscribeModalBase);

export const useSubscribeModal = (): Pick<
  ReturnType<typeof useDisclosure>,
  "onOpen" | "isOpen"
> & { SubscribeModal: ComponentType<Pick<SubscribeModalProps, "type">> } => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return {
    onOpen,
    isOpen,
    SubscribeModal: (props) => (
      <SubscribeModal
        {...props}
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
      />
    ),
  };
};
