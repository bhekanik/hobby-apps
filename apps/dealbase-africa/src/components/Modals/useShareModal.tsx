import {
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { ComponentType, memo, useEffect, useRef, useState } from "react";
import { IoShareOutline } from "react-icons/io5";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export interface ShareModalProps {
  imageUrl: string;
  shareUrl: string;
  shortShareUrl: string;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export const ShareModalBase = ({
  imageUrl,
  shareUrl,
  shortShareUrl,
  onClose,
  isOpen,
}: ShareModalProps) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const initialRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handleClose = () => {
    onClose();
  };

  const handleCopy = () => {
    const input = initialRef.current;

    if (input) {
      navigator.clipboard.writeText(input.value);
      toast({
        title: "Copied to clipboard",
        variant: "subtle",
        isClosable: true,
      });
    }
  };

  async function shareImage() {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const filesArray = [
      new File([blob], "dealflow.jpg", {
        type: "image/jpeg",
        lastModified: new Date().getTime(),
      }),
    ];
    const shareData = {
      files: filesArray,
    };
    navigator.share(shareData);
  }

  const [urlToPost, setUrlToPost] = useState("");

  useEffect(() => {
    if (shareUrl) {
      setUrlToPost(encodeURI(shareUrl));
    }
  }, [shareUrl]);

  return (
    <Modal
      closeOnOverlayClick={false}
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share</ModalHeader>
        <ModalCloseButton />

        <Flex flexDir="column" padding={4} gap={2}>
          <Flex alignItems="center" gap={2}>
            <Input
              variant="filled"
              ref={initialRef}
              value={shortShareUrl}
              readOnly
              _focus={{ outline: "none" }}
            />
            <Button onClick={handleCopy} size="sm">
              Copy
            </Button>
          </Flex>
          <Image
            src={imageUrl || "https://picsum.photos/seed/picsum/200/300"}
            width={1200}
            height={630}
            alt="share image"
            placeholder="blur"
            blurDataURL="https://picsum.photos/seed/picsum/200/300"
          />
        </Flex>

        <ModalFooter>
          <Flex w="full" justifyContent="space-between" gap={2}>
            <Button size={isLessThan768 ? "sm" : "md"} onClick={onClose}>
              Cancel
            </Button>

            <Flex gap={isLessThan768 ? 4 : 2}>
              <IconButton
                aria-label="Share"
                onClick={shareImage}
                size={isLessThan768 ? "sm" : "lg"}
                icon={
                  <Icon
                    as={IoShareOutline}
                    cursor="pointer"
                    color="#D98F39"
                    fontSize={isLessThan768 ? 24 : 32}
                  />
                }
              />
              {/* <IconButton
                aria-label="Download"
                onClick={shareImage}
                size="lg"
                icon={
                  <Icon
                    as={MdFileDownload}
                    cursor="pointer"
                    color="#D98F39"
                    fontSize={32}
                  />
                }
              /> */}
              <FacebookShareButton url={shortShareUrl}>
                <FacebookIcon
                  size={isLessThan768 ? 32 : 48}
                  borderRadius={10}
                />
              </FacebookShareButton>
              <WhatsappShareButton url={shortShareUrl}>
                <WhatsappIcon
                  size={isLessThan768 ? 32 : 48}
                  borderRadius={10}
                />
              </WhatsappShareButton>
              <TwitterShareButton
                related={["@dealbase_africa_io"]}
                url={urlToPost}
              >
                <TwitterIcon size={isLessThan768 ? 32 : 48} borderRadius={10} />
              </TwitterShareButton>
              <LinkedinShareButton url={shortShareUrl}>
                <LinkedinIcon
                  size={isLessThan768 ? 32 : 48}
                  borderRadius={10}
                />
              </LinkedinShareButton>
            </Flex>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ShareModal = memo(ShareModalBase);

export const useShareModal = (): Pick<
  ReturnType<typeof useDisclosure>,
  "onOpen" | "isOpen"
> & {
  ShareModal: ComponentType<
    Pick<ShareModalProps, "imageUrl" | "shareUrl" | "shortShareUrl">
  >;
} => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return {
    onOpen,
    isOpen,
    ShareModal: (props) => (
      <ShareModal
        {...props}
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
      />
    ),
  };
};
