import { CategoriesSectionData } from "@/components/sections/categoriesSection/categoriesSection.types";
import { HeroSlide } from "@/components/sections/heroSlider/heroSlider.types";
import { ManualProductsSectionData } from "@/components/sections/manualProductsSection/manualProductsSection.type";
import { ProductsTabsSectionData } from "@/components/sections/productsTabsSection/productsTabsSection.types";
import { wpFetch } from "@/lib/wpFetch";

type HomeHeroSliderResponse = {
  slides: HeroSlide[];
};

type HomeSectionsResponse = {
  sections: (CategoriesSectionData | ProductsTabsSectionData | ManualProductsSectionData)[];
};

export async function getHomeHeroSlider() {
  return wpFetch<HomeHeroSliderResponse>("/headless/v1/home/slider", { revalidate: 300 });
}

export async function getHomeSections() {
  return wpFetch<HomeSectionsResponse>("/headless/v1/home/sections", { revalidate: 0 });
}
