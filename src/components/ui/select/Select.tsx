import clsx from "clsx";
import { ChevronDown } from "lucide-react";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  value?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
};

export function Select({ value, onChange, options, placeholder, error }: SelectProps) {
  return (
    <>
      <ChevronDown className="absolute top-3.5 right-3 text-current pointer-events-none" />
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error}
        className={clsx(
          "peer w-full border-2 pl-3 pr-12 py-3 transition-colors focus:outline-none bg-white font-sans appearance-none",
          error ? "border-red-300 focus:border-red-300" : "border-neutral-200 focus:border-neutral-500",
        )}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {options.map((opt) => (
          <option className="font-[Arial]" key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );
}
