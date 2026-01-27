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
    <div className={clsx("relative flex flex-col gap-2", className)}>
      {children}

      <Label
        htmlFor={htmlFor}
        className="before:transition-transform before:duration-200 before:bg-white before:absolute before:-left-1 before:w-[calc(100%+8px)] 
        before:z-[-1] before:h-full before:origin-center before:scale-x-0 px-0.5 absolute left-3 pointer-events-none translate-y-3 transition-all duration-300 ease-in-out 
        peer-autofill:before:scale-x-100 peer-focus:before:scale-x-100 peer-not-placeholder-shown:before:scale-x-100
        peer-autofill:scale-[0.85] peer-focus:scale-[0.85] peer-not-placeholder-shown:scale-[0.85] peer-not-placeholder-shown:-translate-y-3 peer-focus:-translate-y-3  peer-autofill:-translate-y-3 origin-left"
        required={required}
      >
        {label}
      </Label>

      {hint && !error && <p className="text-sm text-neutral-500 dark:text-neutral-300">{hint}</p>}

      <FormError message={error} variant="inline" />
    </div>
  );
}
