type Options = {
  min?: number;
  max?: number;
  value: number;
  onChange: (value: number) => void;
};

export function useQuantity({ value, min = 1, max, onChange }: Options) {
  const clamp = (v: number) => {
    if (max === undefined) return Math.max(v, min);
    return Math.min(Math.max(v, min), max);
  };

  const set = (v: number) => onChange(clamp(v));
  const inc = () => set(value + 1);
  const dec = () => set(value - 1);

  const onInputChange = (raw: string) => {
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;
    set(parsed);
  };

  return {
    value,
    inc,
    dec,
    onInputChange,
    canDec: value > min,
    canInc: max ? value < max : true,
  };
}
