import { CountryInfo } from '@/app/countries/[iso2]/country-info';
import { ACCountry } from '@/model/ac-country';
import { render, screen } from '@testing-library/react';

// Mock next/navigation (used by AdjacentNavigation internally)
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
}));

// Mock useApi — controls what the component "receives" from the API
const mockUseApi = jest.fn();
jest.mock('../api/use-api', () => ({
  useApi: (...args: unknown[]) => mockUseApi(...args),
}));

// Mock CountryShape to avoid SVG fetch in tests
jest.mock('../components/world/country-shape', () => ({
  CountryShape: () => null,
}));

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
  beforeEach(() => {
    mockUseApi.mockReturnValue({ data: null, error: null, loading: false });
  });

  it('renders country information when data is loaded', () => {
    mockUseApi.mockReturnValue({
      data: mockAcCountry,
      error: null,
      loading: false,
    });

    render(<CountryInfo iso2='JP' />);

    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText('JP')).toBeInTheDocument();
    expect(screen.getByText('JPN')).toBeInTheDocument();
    expect(screen.getByText('Asia')).toBeInTheDocument();
    expect(screen.getByText('Eastern Asia')).toBeInTheDocument();
    expect(screen.getByText('Japanese yen')).toBeInTheDocument();
    expect(screen.getByText('Japanese')).toBeInTheDocument();
  });

  it('renders N/A values when data is loading', () => {
    mockUseApi.mockReturnValue({ data: null, error: null, loading: true });

    render(<CountryInfo iso2='JP' />);

    expect(screen.getAllByText('N/A').length).toBeGreaterThan(0);
  });

  it('shows error message when API fails', () => {
    mockUseApi.mockReturnValue({
      data: null,
      error: new Error('Network error'),
      loading: false,
    });

    render(<CountryInfo iso2='JP' />);

    expect(screen.getByTestId('country-info-error')).toBeInTheDocument();
  });
});
