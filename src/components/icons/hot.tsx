import { LucideProps } from "lucide-react";

export function Hot({ size = 24, color = "currentColor", className, ...props }: LucideProps) {
  return (
    <svg
      height={size}
      viewBox="0 0 512 512"
      width={size}
      className={className}
      xmlSpace="preserve"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="m432 312c0 120-78.798 176-176 176s-176-64-176-176c0 0 0-64 48-104 0 0 0 64 32 88 0 0-16-192 168-272 0 0-64 184 24 240 0 0 16-72 16-128 0 0 64 16 64 176z"
          fill="#eb423f"
        ></path>
        <path
          d="m352 392c0 66.207-41.371 96-95 96s-97-34.207-97-96c0 0 0-32 24-56 0 0-1.655 34.759 16 48 0 0 8-96 80-136 0 0-16.552 81.103 32 112 0 0 8-33.103 8-64 0 0 32 7.724 32 96z"
          fill="#ffd33a"
        ></path>
        <g fill="#eb423f">
          <path d="m80 200s0-64 48-80c0 0-8 80-48 80z"></path>
          <path d="m424 120s0-64-48-80c0 0 8 80 48 80z"></path>
        </g>
      </g>
    </svg>
  );
}
