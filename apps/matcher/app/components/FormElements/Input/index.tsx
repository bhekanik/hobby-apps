import classnames from "classnames";
import { forwardRef, InputHTMLAttributes, PropsWithChildren } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>
>(({ children, className, color = "primary", ...props }, ref) => {
  const inputClasses = classnames(
    "p-2 px-6 w-full bg-gray-700 rounded-full",
    className
  );

  return <input {...props} ref={ref} className={inputClasses} />;
});
