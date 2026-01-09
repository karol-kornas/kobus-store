import { LucideProps } from "lucide-react";

export function Hamburger({ size = 24, color = "currentColor", className, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      {...props}
      xmlSpace="preserve"
    >
      <path d="M22.1 5.5c0 .4-.3.7-.7.7H2.7c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7h18.7c.3 0 .7.3.7.7zm-3.6 5.8H2.7c-.4 0-.7.3-.7.7s.3.7.7.7h15.8c.4 0 .7-.3.7-.7s-.3-.7-.7-.7zM12 17.7H2.7c-.4 0-.7.3-.7.7 0 .4.3.7.7.7H12c.4 0 .7-.3.7-.7 0-.3-.3-.7-.7-.7z" />{" "}
    </svg>
  );
}
