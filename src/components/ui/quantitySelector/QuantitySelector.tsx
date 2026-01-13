"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  initial?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
};

export default function QuantitySelector({ initial = 1, min = 1, max = Infinity, onChange }: Props) {
  const [quantity, setQuantity] = useState(initial);

  const update = (value: number) => {
    const newValue = Math.max(min, Math.min(max, value));
    setQuantity(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => update(quantity - 1)}
        disabled={quantity <= min}
        className="size-12 flex items-center justify-center rounded-full bg-neutral-100 cursor-pointer hover:bg-neutral-200 transition-colors"
      >
        <Minus />
      </button>

      <input
        type="number"
        value={quantity}
        min={min}
        max={max}
        onChange={(e) => update(Number(e.target.value))}
        className="no-spinner size-14 text-center bg-black text-white rounded-full font-medium text-lg"
      />

      <button
        onClick={() => update(quantity + 1)}
        disabled={quantity >= max}
        className="size-12 flex items-center justify-center rounded-full bg-neutral-100 font-medium cursor-pointer hover:bg-neutral-200 transition-colors"
      >
        <Plus />
      </button>
    </div>
  );
}
