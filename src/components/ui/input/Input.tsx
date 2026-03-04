import clsx from "clsx";
import React, { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ error, className, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      placeholder={props.placeholder ?? " "}
      aria-invalid={error}
      className={clsx(
        "w-full border-2 px-3 py-3 peer transition-colors focus:outline-none",
        error ? "border-red-300 focus:border-red-300" : "border-neutral-200 focus:border-neutral-500",
        className,
      )}
    />
  );
});

Input.displayName = "Input";
