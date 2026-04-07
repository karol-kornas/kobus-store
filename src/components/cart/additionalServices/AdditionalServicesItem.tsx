import { Button } from "@/components/ui/button/Button";
import { SmartImage } from "@/components/ui/smartImage/SmartImage";
import { useCart } from "@/features/cart/hooks/cart.hooks";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import { useState } from "react";

type Props = {
  item: Product;
  index: number;
};

export function AdditionalServicesItem({ item, index }: Props) {
  const image = item.images[0];
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  return (
    <article
      className={`${index == 1 ? "border-[#80bd00] border-2 text-[#80bd00]" : ""} flex w-[48%] lg:w-[32%] xl:w-full gap-3 flex-col p-4 items-center text-center 
      bg-white rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.025),0_4px_6px_-4px_rgba(0,0,0,0.025)]`}
    >
      {image && (
        <SmartImage
          src={image.src}
          alt={item.name}
          className={`w-10 ${index == 1 && "filter-green"}`}
          wrapClassName="w-10"
          width={image.width ?? 40}
          height={image.height ?? 40}
          sizes="40px"
        />
      )}
      <div className="font-bold leading-tight text-[0.875rem] uppercase">{item.name}</div>
      <div className="mt-auto">
        <div className="flex justify-center gap-2 font-semibold">
          {formatPrice(item.price)}
          {item.on_sale && item.regular_price && (
            <span className="text-sm font-normal line-through">{formatPrice(item.regular_price)}</span>
          )}
        </div>
        <Button
          size="xs"
          variant={index == 1 ? "green" : "primary"}
          className="uppercase mt-2"
          isLoading={isAdding}
          disabled={isAdded}
          onClick={async () => {
            setIsAdding(true);
            await addItem(item.id, 1);
            setIsAdding(false);
            setIsAdded(true);
          }}
        >
          {isAdded ? "Dodano!" : "Dodaj"} <span className="sr-only">do koszyka</span>
        </Button>
      </div>
    </article>
  );
}
