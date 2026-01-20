export type CartDrawerProduct = {
  id: number;
  name: string;
  image?: string;
  price: number | null;
  regular_price: number | null;
  sale_price: number | null;
  on_sale: boolean;
  lowest_price_30_days?: number | null;
  quantity: number;
  variations?: CartDrawerVariation[];
};

export type CartDrawerVariation = {
  label: string;
  value: string;
};
