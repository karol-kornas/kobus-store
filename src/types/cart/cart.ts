import { CartBillingAddress } from "./cartBillingAddress";
import { CartCoupon } from "./cartCoupon";
import { CartFees } from "./cartFees";
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
  billing_address: CartBillingAddress;
  shipping_rates: CartShippingPackage[];
  payment_methods: string[];
  fees: CartFees[];
  needs_shipping: boolean;
  needs_payment: boolean;
  coupons: CartCoupon[];
}
