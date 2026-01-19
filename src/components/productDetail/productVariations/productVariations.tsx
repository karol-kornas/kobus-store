export type Variation = {
  id: number;
  price: number;
  attributes: Record<string, string>;
  raw_attribute?: string;
  attribute?: string;
  is_in_stock: boolean;
  value?: string;
};

type Props = {
  variations: Variation[];
  onSelect: (variation: Variation) => void;
  selectedId?: number | null;
};

export function ProductVariations({ variations, onSelect, selectedId }: Props) {
  const sizeAttribute = "attribute_pa_rozmiar";

  return (
    <div>
      <p className="mb-2 font-medium">Rozmiar</p>

      <div className="flex gap-2 flex-wrap">
        {variations.map((variation) => {
          const label = variation.attributes[sizeAttribute];

          const isSelected = selectedId === variation.id;
          const isDisabled = !variation.is_in_stock;

          return (
            <button
              key={variation.id}
              disabled={isDisabled}
              onClick={() => onSelect(variation)}
              className={`
                px-4 py-2 border uppercase
                ${isSelected ? "border-black bg-black text-white" : "border-gray-300"}
                ${isDisabled ? "opacity-40 cursor-not-allowed" : "hover:border-black"}
              `}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
