export type CrossSellItem = {
  id: number;
  name: string;
  slug: string;
  images: {
    id: number;
    src: string;
    srcset: string;
    alt: string;
  }[];
  price: number | null;
  regular_price: number | null;
  sale_price: number | null;
  is_in_stock: boolean;
  on_sell: boolean;
};
