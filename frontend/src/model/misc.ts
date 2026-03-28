export type TopicType = '' | 'population' | 'airports' | 'economy';

export interface PopulationRank {
  dbId: number;
  countryIso2: string;
  continent: string;
  countryName: string;
  population: number;
  countCountries: number;
  rank: number;
}
