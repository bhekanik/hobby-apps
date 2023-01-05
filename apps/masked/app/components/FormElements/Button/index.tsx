import classnames from "classnames";
import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from "react";
import { Color, colors } from "~/lib/theme/colors";

interface Props {
  color?: Color;
  textColor?: string;
}

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & Props>
>(({ children, className, textColor, color = "primary", ...props }, ref) => {
  const btnClasses = classnames(
    `p-2 flex text-bold border-[1px] border-gray-400 justify-center rounded-full`,
    `${colors[color]}-800`,
    `hover:${colors[color]}-500`,
    `hover:text-green-500`,
    textColor ?? "text-white",
    className
  );

  return (
    <button {...props} ref={ref} className={btnClasses}>
      {children}
    </button>
  );
});
