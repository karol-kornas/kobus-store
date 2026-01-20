"use client";

import { Minus, Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  quantity?: number;
  min?: number;
  max?: number;
  setQuantity: Dispatch<SetStateAction<number>>;
};

export default function QuantitySelector({ quantity = 1, min = 1, max, setQuantity }: Props) {
  const clamp = (value: number) => {
    if (max === undefined) return Math.max(value, min);
    return Math.min(Math.max(value, min), max);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setQuantity((q) => clamp(q - 1))}
        disabled={quantity <= min}
        className="size-12 flex items-center justify-center rounded-full bg-neutral-100 cursor-pointer hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:pointer-events-none"
      >
        <Minus />
      </button>

      <input
        type="number"
        value={quantity}
        min={min}
        max={max}
        onChange={(e) => {
          const value = clamp(Number(e.target.value) || min);
          if (Number.isNaN(value)) return;
          setQuantity(value);
        }}
        className="no-spinner size-14 text-center bg-black text-white rounded-full font-medium text-lg"
      />

      <button
        onClick={() => setQuantity((q) => clamp(q + 1))}
        disabled={max ? quantity >= max : false}
        className="size-12 flex items-center justify-center rounded-full bg-neutral-100 font-medium cursor-pointer hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:pointer-events-none"
      >
        <Plus />
      </button>
    </div>
  );
}
