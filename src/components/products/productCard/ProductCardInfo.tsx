type Props = {
  name: string;
  price: number;
  isOnSale: boolean;
  regularPrice?: string;
};

export function ProductCardInfo({ name, price, isOnSale, regularPrice }: Props) {
  return (
    <>
      <h3 className="hover:opacity-85 font-medium h-12 line-clamp-2">{name}</h3>

      <div className="flex gap-2 font-semibold">
        {price} zł
        {isOnSale && regularPrice && <span className="text-sm line-through">{regularPrice} zł</span>}
      </div>
    </>
  );
}
