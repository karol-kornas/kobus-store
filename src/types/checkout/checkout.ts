import { ApiCart } from "../cart/apiCart";
import { ApiCartBillingAddress } from "../cart/cartBillingAddress";
import { ApiCartShippingAddress } from "../cart/cartShippingAddress";
import { ApiPaymentResult } from "./paymentResult";

export type Checkout = {
  order_id: number;
  status: string;
  order_key: string;
  customer_note: string;
  customer_id: number;
  billing_address: ApiCartBillingAddress;
  shipping_address: ApiCartShippingAddress;
  payment_method: string;
  payment_result: ApiPaymentResult;
  __experimentalCart?: ApiCart | null;
};
