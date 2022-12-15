import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  IconButton,
  IconButtonProps,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { MouseEventHandler } from "react";

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  override?: boolean;
}

export const ColorModeToggle = ({
  onClick,
  override = false,
  ...props
}: Props & Partial<IconButtonProps>): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);
    if (!override) toggleColorMode();
  };

  return (
    <IconButton
      {...props}
      name="color-mode-toggle"
      role="button"
      size={isLessThan768 ? "lg" : "md"}
      aria-label="Toggle Dark Mode"
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      onClick={handleClick}
    />
  );
};
