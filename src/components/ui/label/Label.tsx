import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

type LabelProps = ComponentPropsWithoutRef<"label"> & {
  required?: boolean;
};

export function Label({ children, required, className, ...props }: LabelProps) {
  return (
    <label className={clsx("block font-medium", className)} {...props}>
      {children}
      {required && <span className="ml-1 text-red-400">*</span>}
    </label>
  );
}
