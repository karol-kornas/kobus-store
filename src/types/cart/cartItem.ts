import { CartImage } from "./cartImage";
import { CartItemTotals } from "./cartItemTotals";
import { CartPrices } from "./cartPrices";

export interface CartItem {
  key: string;
  id: number;
  name: string;
  quantity: number;
  permalink: string;
  images: CartImage[];
  prices: CartPrices;
  totals: CartItemTotals;
}
