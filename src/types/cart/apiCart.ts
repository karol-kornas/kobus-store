import { ApiCartShippingAddress } from "./cartShippingAddress";
import { ApiCartShippingPackage } from "./CartShippingPackage";

export type ApiCart = {
  items: ApiCartItem[];
  items_count: number;
  totals: {
    total_price: string | number;
    total_items: string | number;
    total_items_tax: number | null;
    total_shipping: string;
    total_shipping_tax: string;
    total_tax: string;
    currency_code: string;
    currency_symbol: string;
    currency_suffix: string;
  };
  cross_sells: ApiCrossSellItem[];
  shipping_address: ApiCartShippingAddress;
  billing_address: ApiCartShippingAddress;
  shipping_rates: ApiCartShippingPackage[];
  payment_methods: string[];
};

export type ApiCartItem = {
  key: string;
  id: number;
  name: string;
  quantity: number;
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
  };
  images?: {
    id: number;
    src: string;
    srcset: string;
    name: string;
  }[];
  variation?: {
    raw_attribute: string;
    attribute: string;
    value: string;
  }[];
  totals: {
    line_total: string;
  };
  on_sale: boolean;
};

export type ApiCrossSellItem = {
  id: number;
  name: string;
  slug: string;
  images?: {
    id: number;
    src: string;
    srcset: string;
    name: string;
  }[];
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
  };
  is_in_stock: boolean;
  on_sale: boolean;
};
