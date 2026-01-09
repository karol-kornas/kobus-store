import { getSeo } from "@/lib/wp/seo";
import { HeroSlider } from "@/components/sections/heroSlider/HeroSlider";
import { getHomeHeroSlider, getHomeSections } from "@/features/home/home.server";
import { SectionsRenderer } from "@/components/sectionsRenderer/SectionsRenderer";

export async function generateMetadata() {
  const seo = await getSeo({ type: "home" });

  return {
    title: seo.title,
    description: seo.description,
  };
}

export default async function HomePage() {
  const { slides } = await getHomeHeroSlider();
  const { sections } = await getHomeSections();

  return (
    <>
      <HeroSlider slides={slides} />
      <SectionsRenderer sections={sections} />
    </>
  );
}
