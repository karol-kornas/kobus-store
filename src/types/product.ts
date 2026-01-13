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
    width: number;
    height: number;
  }[];
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  lowest_price_30_days?: string | null;
  short_description?: string;
  description?: string;
  additional_services: AdditionalService[];
  stock_quantity: number;
};

export type AdditionalService = {
  id: number;
  name: string;
  price: number;
  thumbnail?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
  preview_image?: string;
  preview_image_width?: number;
  preview_image_height?: number;
  add_to_cart_url: string;
};
