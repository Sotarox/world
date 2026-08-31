export interface Country {
  dbId: number;
  id: string;
  capital: string;
  currencyCode: string;
  fipsCode: string;
  countryIso2: string;
  countryIso3: string;
  continent: string;
  countryId: string;
  countryName: string;
  currencyName: string;
  countryIsoNumeric: string;
  phonePrefix: string;
  population: number;
  totalNumberOfAirports: number;
}

export const InfoCardTitles = [
  'Region',
  'Subregion',
  'Coordinate',
  'Capital',
  'Country ISO2',
  'Country ISO3',
  'Top domain',
  'Phone prefix',
  'Currency',
  'Independent',
  'Language',
  'Time zone',
] as const;

export interface InfoCardEntry {
  index: number;
  title: (typeof InfoCardTitles)[number];
}
