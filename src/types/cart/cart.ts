import { CartItem } from "./cartItem";
import { CartTotals } from "./cartTotals";
import { CrossSellItem } from "./crossSellItem";

export interface Cart {
  items: CartItem[];
  totals: CartTotals;
  items_count: number;
  cross_sells: CrossSellItem[];
}
