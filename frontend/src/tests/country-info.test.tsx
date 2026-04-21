import { CountryInfo } from '@/app/countries/[iso2]/country-info';
import { Country } from '@/model/country';
import { ACCountry } from '@/model/ac-country';
import { render, screen } from '@testing-library/react';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: null }),
  })
) as jest.Mock;

const mockCountry: Country = {
  dbId: 116,
  id: '86048',
  capital: 'Tokyo',
  currencyCode: 'JPY',
  fipsCode: 'JA',
  countryIso2: 'JP',
  countryIso3: 'JPN',
  continent: 'AS',
  countryId: '116',
  countryName: 'Japan',
  currencyName: 'Yen',
  countryIsoNumeric: '392',
  phonePrefix: '81',
  population: 127288000,
  totalNumberOfAirports: 92,
};

const mockAcCountry: ACCountry = {
  name: 'Japan',
  topLevelDomain: ['.jp'],
  alpha2Code: 'JP',
  alpha3Code: 'JPN',
  callingCodes: ['81'],
  capital: 'Tokyo',
  altSpellings: ['JP', 'Nippon', 'Nihon'],
  subregion: 'Eastern Asia',
  region: 'Asia',
  population: 125836021,
  latlng: [36.0, 138.0],
  demonym: 'Japanese',
  area: 377930.0,
  timezones: ['UTC+09:00'],
  borders: null,
  nativeName: '日本',
  numericCode: '392',
  flags: {
    svg: 'https://flagcdn.com/jp.svg',
    png: 'https://flagcdn.com/w320/jp.png',
  },
  currencies: [
    {
      code: 'JPY',
      name: 'Japanese yen',
      symbol: '¥',
    },
  ],
  languages: [
    {
      iso639_1: 'ja',
      iso639_2: 'jpn',
      name: 'Japanese',
      nativeName: '日本語 (にほんご)',
    },
  ],
  translations: {
    br: 'Japan',
    pt: 'Japão',
    nl: 'Japan',
    hr: 'Japan',
    fa: 'ژاپن',
    de: 'Japan',
    es: 'Japón',
    fr: 'Japon',
    ja: '日本',
    it: 'Giappone',
    hu: 'Japán',
  },
  flag: 'https://flagcdn.com/jp.svg',
  regionalBlocs: null,
  cioc: 'JPN',
  independent: true,
};

describe('CountryInfo Component', () => {
  it('renders country information correctly', () => {
    render(
      <CountryInfo
        iso2='JP'
        acCountry={mockAcCountry}
        country={mockCountry}
        previousNav={undefined}
        nextNav={undefined}
      />
    );
    expect(screen.getByText('Japan')).toBeInTheDocument();
  });
});
