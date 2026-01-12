export type SeoContext =
  | { type: "home" }
  | { type: "page"; id: number }
  | { type: "post"; id: number }
  | { type: "product"; id: number }
  | { type: "product_category"; id: number };

export type SeoResponse = {
  title: string;
  description: string;
  canonical: string;
  og: {
    image: string;
    width: number;
    height: number;
  };
};
