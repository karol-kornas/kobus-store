import { HeroSlider } from "@/components/sections/heroSlider/HeroSlider";
import { getHomeHeroSlider, getHomeSections } from "@/features/home/home.server";
import { SectionsRenderer } from "@/components/sectionsRenderer/SectionsRenderer";
import { getSeo } from "@/features/seo/seo.server";
import { mapSeoToMetadata } from "@/features/seo/seo.helpers";

export async function generateMetadata() {
  const seo = await getSeo({ type: "home" });

  return mapSeoToMetadata(seo);
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
