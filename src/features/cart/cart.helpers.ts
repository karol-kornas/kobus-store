import { CartItem } from "@/types/cart/cartItem";
import { CartMergeItem } from "@/types/cart/cartMergeItem";

export function getGuestCartSnapshot(items: CartItem[] | null | undefined): CartMergeItem[] {
  if (!items || items.length === 0) return [];

  return items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));
}

export function isCartItemOnSale(item: {
  price: number | null;
  regular_price: number | null;
  sale_price: number | null;
}) {
  if (!item.regular_price || !item.sale_price) return false;

  return item.sale_price < item.regular_price;
}
