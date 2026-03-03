// utils/states.ts
export function countryRequiresState(
  states: Record<string, unknown>,
  country?: string,
) {
  if (!country) return false;

  const countryStates = states[country];

  if (!countryStates) return false;

  return Object.keys(countryStates).length > 0;
}
