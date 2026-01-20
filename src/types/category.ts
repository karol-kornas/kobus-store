export type Category = {
  id: number;
  slug: string;
  name: string;
  image: {
    id: number;
    src: string;
    srcset?: string;
    sizes?: string;
    alt: string;
    width: number;
    height: number;
  };
};
