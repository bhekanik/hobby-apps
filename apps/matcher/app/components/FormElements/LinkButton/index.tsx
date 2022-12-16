import { Link } from "@remix-run/react";
import classnames from "classnames";
import { AnchorHTMLAttributes, forwardRef, PropsWithChildren } from "react";
import { Color, colors } from "~/lib/theme/colors";

interface Props {
  color?: Color;
  to: string;
}

export const LinkButton = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement> & Props>
>(({ children, className, color = "primary", to, ...props }, ref) => {
  const btnClasses = classnames(
    `p-2 px-4 flex text-bold border-[1px] border-purple-400 text-white items-center whitespace-nowrap justify-center rounded-full`,
    `${colors[color]}-800`,
    `hover:${colors[color]}-500`,
    `hover:text-green-500`,
    className
  );

  return (
    <Link to={to} {...props} ref={ref} className={btnClasses}>
      {children}
    </Link>
  );
});
