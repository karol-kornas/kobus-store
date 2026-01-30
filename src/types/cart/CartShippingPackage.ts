export type ApiCartShippingPackage = {
  package_id: number;
  name: string;

  destination: {
    address_1: string;
    address_2?: string;
    city: string;
    postcode: string;
    country: string;
    state?: string;
  };

  items: Array<{
    key: string;
    product_id: number;
    variation_id?: number;
    quantity: number;
  }>;

  shipping_rates: ApiCartShippingRate[];
};

export type ApiCartShippingRate = {
  rate_id: string;
  method_id: string;
  instance_id: number;

  name: string;
  description: string;
  delivery_time: string;

  price: string;
  taxes: string;

  currency_code: string;
  currency_symbol: string;
  currency_prefix: string;
  currency_suffix: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;

  selected: boolean;

  meta_data: Array<{
    key: string;
    value: unknown;
  }>;
};

export type CartShippingPackage = {
  package_id: number;
  name: string;

  destination: {
    address_1: string;
    address_2?: string;
    city: string;
    postcode: string;
    country: string;
    state?: string;
  };

  items: Array<{
    key: string;
    product_id: number;
    variation_id?: number;
    quantity: number;
  }>;

  shipping_rates: CartShippingRate[];
};

export type CartShippingRate = {
  rate_id: string;
  method_id: string;
  instance_id: number;

  name: string;
  description: string;
  delivery_time: string;

  price: number | null;
  taxes: number | null;

  currency_code: string;
  currency_symbol: string;
  currency_prefix: string;
  currency_suffix: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;

  selected: boolean;

  meta_data: Array<{
    key: string;
    value: unknown;
  }>;
};
