export type CountryCode = string;
export type StateCode = string;

export type CountriesMap = Record<CountryCode, string>;

export type StatesMap = Record<CountryCode, Record<StateCode, string> | []>;

export type CountriesStates = {
  countries: CountriesMap;
  states: StatesMap;
};
