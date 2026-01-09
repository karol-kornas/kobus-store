import { ProductLabel } from "@/types/productLabel";

type Props = {
  className: string;
  labels: ProductLabel[];
};

export function ProductLabels({ className, labels }: Props) {
  return (
    <div className={`flex gap-1 flex-wrap text-black ${className}`}>
      {labels.map((label, i) => {
        return (
          <span
            key={`${label.type}-${i}`}
            className={`border border-black px-2 py-1 text-[0.625rem] uppercase ${
              label.type === "bestseller" ? "bg-black text-white" : "bg-white"
            }`}
          >
            {label.label}
          </span>
        );
      })}
    </div>
  );
}
