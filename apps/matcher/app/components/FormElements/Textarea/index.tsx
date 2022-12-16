import classnames from "classnames";
import { motion, MotionProps } from "framer-motion";
import { forwardRef, PropsWithChildren, TextareaHTMLAttributes } from "react";

interface Props {
  onClickAway?: () => void;
}

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  PropsWithChildren<
    TextareaHTMLAttributes<HTMLTextAreaElement> & MotionProps & Props
  >
>(
  (
    { children, className, color = "primary", onClickAway, rows, ...props },
    ref
  ) => {
    const inputClasses = classnames(
      "p-4 w-full bg-purple-700 rounded-3xl overflow-auto",
      className,
      !className?.includes("px-") && "px-6"
    );

    return (
      <motion.textarea
        key={rows}
        {...props}
        rows={rows}
        initial={false}
        animate={{ height: "auto" }}
        ref={ref}
        className={inputClasses}
      />
    );
  }
);
