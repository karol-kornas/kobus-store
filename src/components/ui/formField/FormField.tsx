import { ReactNode } from "react";
import clsx from "clsx";
import { Label } from "../label/Label";
import { FormError } from "../form/formError/FormError";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

export function FormField({ label, htmlFor, required, error, hint, children, className }: FormFieldProps) {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>

      {children}

      {hint && !error && <p className="text-sm text-neutral-500 dark:text-neutral-300">{hint}</p>}

      <FormError message={error} variant="inline" />
    </div>
  );
}
