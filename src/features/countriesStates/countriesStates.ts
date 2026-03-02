// features/checkout/countriesStates.server.ts
import { wpFetch } from "@/lib/wpFetch";
import { CountriesStates } from "@/types/countriesStates/countriesStates";

export async function getCountriesStatesServer(): Promise<CountriesStates> {
  return wpFetch<CountriesStates>(
    "/headless/v1/countries-states",
    undefined,
    { revalidate: 86400 }, // 24h
  );
}
