export type CategoriesSectionData = {
  id: string;
  type: "featured_categories_section";
  title: string;
  categories: CategorySectionData[];
};

export type CategorySectionData = {
  id: number;
  slug: string;
  name: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
};
