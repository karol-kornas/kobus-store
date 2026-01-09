import clsx from "clsx";

type FormErrorProps = {
  message?: string;
  variant?: "auth" | "checkout" | "inline";
};

export function FormError({ message, variant = "auth" }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      className={clsx(
        "text-sm",
        variant === "auth" && "bg-red-200 p-2 text-black",
        variant === "checkout" && "bg-red-50 border border-red-200 text-red-700",
        variant === "inline" && "text-red-500 dark:text-red-200"
      )}
      role="alert"
    >
      {message}
    </div>
  );
}
