import { Check } from "lucide-react";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className="relative flex gap-3 cursor-pointer select-none">
      <input {...props} type="checkbox" className="peer absolute size-4 opacity-0" />

      <span
        className="
          flex flex-none items-center justify-center
          size-6
          border border-neutral-400
          bg-background
          transition
          focus:outline-none
          peer-checked:bg-foreground
          peer-checked:border-foreground
          peer-checked:[&_svg]:opacity-100
          peer-focus-visible:ring
        "
      >
        <Check size={18} strokeWidth={3} className="opacity-0 transition-opacity text-background" />
      </span>

      <span className="text-foreground">{label}</span>
    </label>
  );
}
