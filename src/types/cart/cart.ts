import { CartItem } from "./cartItem";
import { CartShippingAddress } from "./cartShippingAddress";
import { CartShippingPackage } from "./CartShippingPackage";
import { CartTotals } from "./cartTotals";
import { CrossSellItem } from "./crossSellItem";

export interface Cart {
  items: CartItem[];
  totals: CartTotals;
  items_count: number;
  cross_sells: CrossSellItem[];
  shipping_address: CartShippingAddress;
  shipping_rates: CartShippingPackage[];
}
