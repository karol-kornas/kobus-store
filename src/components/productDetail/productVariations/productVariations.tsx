import { Variation } from "@/types/product";

type Props = {
  variations: Variation[];
  onSelect: (variation: Variation) => void;
  selectedId?: number | null;
};

export function ProductVariations({ variations, onSelect, selectedId }: Props) {
  if (!variations || variations.length === 0) return null;

  const attributeLabel = variations[0]?.attributes[0]?.label ?? "Wariant";

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full">
      <p className="font-semibold">{attributeLabel}:</p>

      <div className="flex gap-2 flex-wrap">
        {variations.map((variation) => {
          const mainAttribute = variation.attributes[0];

          if (!mainAttribute) return null;

          const label = mainAttribute.value;
          const isSelected = selectedId === variation.id;
          const isDisabled = !variation.availability.can_add_to_cart;

          return (
            <button
              key={variation.id}
              onClick={() => onSelect(variation)}
              className={`
                px-4 py-2 border uppercase focus:outline-none focus:ring-2 cursor-pointer
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
