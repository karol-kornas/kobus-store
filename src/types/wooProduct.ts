export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
};
