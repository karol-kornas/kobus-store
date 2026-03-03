import { SelectOption } from "@/components/ui/select/Select";

export function mapCountriesToOptions(
  countries: Record<string, string>,
): SelectOption[] {
  return Object.entries(countries).map(([code, name]) => ({
    value: code,
    label: name,
  }));
}
