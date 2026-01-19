import { CartItem } from "./cartItem";
import { CartTotals } from "./cartTotals";

export interface Cart {
  items: CartItem[];
  totals: CartTotals;
  items_count: number;
}
