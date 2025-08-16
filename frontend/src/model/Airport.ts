export interface Airport {
  dbId: number;
  id: string;
  gmt: string | null;
  airportId: string;
  iataCode: string;
  cityIataCode: string | null;
  icaoCode: string;
  countryIso2: string;
  geonameId: string;
  latitude: string;
  longitude: string;
  airportName: string;
  countryName: string;
  phoneNumber: string | null;
  timezone: string | null;
}
