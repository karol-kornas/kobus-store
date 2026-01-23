export type Product = {
  id: number;
  slug: string;
  name: string;
  price: number | null;
  regular_price: number | null;
  sale_price: number | null;
  on_sale: boolean;
  images: {
    id: number;
    src: string;
    srcset?: string;
    sizes?: string;
    alt: string;
    name: string;
    width: number;
    height: number;
  }[];
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  lowest_price_30_days?: number | null;
  short_description?: string;
  description?: string;
  additional_services: AdditionalService[];
  product_variants: ProductVariant[];
  stock_quantity: number;
  upsell_ids: number[];
  cross_sell_ids: number[];
  variations: Variation[];
  featured: boolean;
  stock_status: string;
};

export type AdditionalService = {
  id: number;
  name: string;
  price: number;
  thumbnail: {
    src: string | null;
    srcset?: string;
    sizes?: string;
    width: number;
    height: number;
    alt: string;
  };
  preview_image: {
    src: string | null;
    srcset?: string;
    sizes?: string;
    width: number;
    height: number;
    alt: string;
  };
  add_to_cart_url: string;
};

export type ProductVariant = {
  id: number;
  name: string;
  slug: string;
  price: number | null;
  thumbnail: {
    src: string | null;
    srcset?: string;
    sizes?: string;
    width: number;
    height: number;
  };
};

export type VariationAttribute = {
  slug: string;
  label: string;
  value: string;
};

export type Variation = {
  id: number;
  price: number;
  attributes: VariationAttribute[];
  is_in_stock: boolean;
};
