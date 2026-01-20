export type CartItem = {
  key: string;
  id: number;
  name: string;
  quantity: number;
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
  price: number | null;
  regular_price: number | null;
  sale_price: number | null;
  variations?: CartItemVariation[];
  totals: {
    line_total: number | null;
  };
};

export type CartItemVariation = {
  raw_attribute: string;
  attribute: string;
  value: string;
};
