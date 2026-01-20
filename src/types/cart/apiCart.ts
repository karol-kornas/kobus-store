export type ApiCart = {
  items: ApiCartItem[];
  items_count: number;
  totals: {
    total_price: string | number;
    total_items: string | number;
    total_shipping: string;
    total_tax: string;
    currency_code: string;
    currency_symbol: string;
    currency_suffix: string;
  };
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
};
