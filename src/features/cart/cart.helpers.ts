import { CartItem } from "@/types/cart/cartItem";
import { CartMergeItem } from "@/types/cart/cartMergeItem";

export function getGuestCartSnapshot(items: CartItem[] | null | undefined): CartMergeItem[] {
  if (!items || items.length === 0) return [];

  return items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));
}
