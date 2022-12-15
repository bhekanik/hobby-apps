import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link, LinkProps, Tooltip } from "@chakra-ui/react";
import { isProd } from "src/lib/config";
import * as ga from "src/lib/googleAnalytics";

interface Props {
  href: string;
  label: string;
  tooltip?: string;
}

export const LinkText = ({
  tooltip,
  href,
  label,
  ...linkProps
}: Props & LinkProps) => {
  return (
    <Tooltip
      label={
        tooltip ?? "Click to read the press release. This is an external link"
      }
    >
      <Link
        display="flex"
        gap={2}
        alignItems="center"
        color="#31A078"
        target="_blank"
        href={href}
        fontWeight="medium"
        onClick={() => {
          if (isProd) {
            ga.event({
              action: "press_release_link_click",
              params: {
                link_to: href,
                date: label,
              },
            });
          }
        }}
        {...linkProps}
      >
        {label}
        <ExternalLinkIcon w={3} h={3} />
      </Link>
    </Tooltip>
  );
};
