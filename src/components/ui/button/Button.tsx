// components/ui/Button.tsx
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { Spinner } from "../spinner/Spinner";

const buttonVariants = cva(
  "relative shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] inline-flex items-center justify-center font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[#262626] text-white hover:bg-white hover:text-[#262626] border border-[#262626] focus:ring-neutral-500 dark:bg-white dark:border-white dark:text-background dark:hover:text-foreground dark:hover:bg-background",
        secondary:
          "bg-white text-[#262626] hover:bg-[#262626] hover:text-white border border-[#262626] focus:ring-neutral-400 dark:bg-background dark:text-white dark:border-white dark:hover:text-[#262626] dark:hover:bg-white",
        ghost: "bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-600",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
        white: "bg-white border border-white text-[#262626] hover:bg-transparent hover:text-white",
        special:
          "bg-[#fa5453] border border-[#fa5453] text-white hover:bg-white hover:text-[#fa5453] focus:ring-neutral-500",
      },
      size: {
        xs: "h-6 px-3 text-xs",
        sm: "h-8 px-4 text-sm",
        md: "h-12.5 px-7 text-base",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && (
          <span
            className={clsx(
              "absolute inset-0 opacity-0 transition-opacity flex items-center justify-center pointer-events-none",
              isLoading && "opacity-100"
            )}
          >
            <Spinner />
          </span>
        )}

        {children}
        {isLoading && (
          <span className="sr-only" aria-live="polite">
            Trwa przetwarzanie
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

type ButtonLinkProps = {
  href: string;
} & VariantProps<typeof buttonVariants> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const ButtonLink = ({ href, variant, size, className, children, ...props }: ButtonLinkProps) => (
  <Link href={href} className={clsx(buttonVariants({ variant, size }), className)} {...props}>
    {children}
  </Link>
);
