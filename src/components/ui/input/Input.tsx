import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export function Input({ error, className, ...props }: InputProps) {
  return (
    <input
      {...props}
      placeholder={props.placeholder ?? " "}
      aria-invalid={error}
      className={clsx(
        "w-full border-2 px-3 py-3 peer transition-colors focus:outline-none",
        error ? "border-red-300 focus:border-red-300" : "border-neutral-200 focus:border-neutral-500",
        className,
      )}
    />
  );
}
