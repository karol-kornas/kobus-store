import { ReactNode } from "react";
import clsx from "clsx";
import { Label } from "../label/Label";
import { FormError } from "../form/formError/FormError";

type FormFieldVariant = "floating" | "static";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
  variant?: FormFieldVariant;
};

export function FormField({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
  className,
  variant = "floating",
}: FormFieldProps) {
  const isFloating = variant === "floating";

  return (
    <div className={clsx("relative flex flex-col gap-1", className)}>
      {children}

      <Label
        htmlFor={htmlFor}
        required={required}
        className={clsx(
          "absolute top-0.5 left-3 origin-left pointer-events-none before:bg-white px-0.5 before:absolute before:-left-1 \
          font-medium before:w-[calc(100%+8px)] before:z-[-1] before:h-full before:origin-center",
          error ? "text-red-400!" : "text-neutral-400",

          isFloating
            ? `
 translate-y-3 transition-all duration-300 ease-in-out
before:transition-transform before:duration-200 
 before:scale-x-0
peer-autofill:before:scale-x-100 peer-focus:before:scale-x-100 peer-not-placeholder-shown:before:scale-x-100
peer-autofill:scale-[0.85] peer-focus:scale-[0.85] peer-not-placeholder-shown:scale-[0.85]
peer-not-placeholder-shown:-translate-y-3.5 peer-focus:-translate-y-3.5 peer-autofill:-translate-y-3.5
 peer-focus:text-neutral-700
`
            : `
-translate-y-3.5 scale-[0.85] before:scale-x-100 peer-focus:text-neutral-700
`,
        )}
      >
        {label}
      </Label>

      {hint && !error && <p className="text-sm text-neutral-500 dark:text-neutral-300">{hint}</p>}

      <FormError message={error} variant="inline" />
    </div>
  );
}
