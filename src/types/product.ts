export type Product = {
  id: number;
  slug: string;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  images: {
    id: number;
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }[];
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  lowest_price_30_days?: string | null;
  short_description: string;
};
