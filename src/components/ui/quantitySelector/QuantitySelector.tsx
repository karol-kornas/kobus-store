"use client";

import { Minus, Plus } from "lucide-react";
import { useQuantity } from "@/hooks/useQuantity";
import { Spinner } from "../spinner/Spinner";
import clsx from "clsx";

type Props = {
  value: number;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  loading?: boolean;
  onChange: (value: number) => void;
};

const styles = {
  md: {
    button: "size-12",
    input: "size-14 text-lg",
    icon: "size-5",
    gap: "gap-2",
  },
  sm: {
    button: "size-9",
    input: "size-10 text-sm",
    icon: "size-4",
    gap: "gap-1.5",
  },
};

export function QuantitySelector({ value, min, max, size = "md", loading, onChange }: Props) {
  const q = useQuantity({ value, min, max, onChange });
  const s = styles[size];
  const buttonStyle =
    "flex items-center justify-center rounded-full bg-neutral-100 font-medium cursor-pointer transition-colors hover:bg-neutral-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-1";

  return (
    <div className={`flex items-center ${s.gap}`}>
      <button onClick={q.dec} disabled={!q.canDec || loading} className={`${s.button} ${buttonStyle}`}>
        <Minus />
      </button>

      <div className="relative">
        <input
          type="number"
          value={q.value}
          disabled={loading}
          min={min}
          max={max}
          onChange={(e) => q.onInputChange(e.target.value)}
          className={`${s.input} text-center rounded-full bg-black text-white no-spinner focus:outline-none focus:ring-2 ring-neutral-500 focus:ring-offset-1 disabled:opacity-50`}
        />
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Spinner />
          </span>
        )}
      </div>

      <button onClick={q.inc} disabled={!q.canInc || loading} className={`${s.button} ${buttonStyle}`}>
        <Plus />
      </button>
    </div>
  );
}
