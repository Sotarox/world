import { CountryInfo } from '@/app/countries/[iso2]/country-info';
import { ACCountry } from '@/model/ac-country';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

// Mock next/navigation (used by AdjacentNavigation internally)
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
}));

const mockUseApi = jest.fn();
jest.mock('../api/axios', () => ({
  __esModule: true,
  default: {
    get: (...args: unknown[]) => mockUseApi(...args),
  },
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

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
    mockUseApi.mockReset();
  });

  it('renders country information when data is loaded', async () => {
    mockUseApi.mockResolvedValueOnce({ data: mockAcCountry });
    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <CountryInfo iso2='JP' />
      </Wrapper>
    );

    expect(await screen.findByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText('JP')).toBeInTheDocument();
    expect(screen.getByText('JPN')).toBeInTheDocument();
    expect(screen.getByText('Asia')).toBeInTheDocument();
    expect(screen.getByText('Eastern Asia')).toBeInTheDocument();
    expect(screen.getByText('Japanese yen')).toBeInTheDocument();
    expect(screen.getByText('Japanese')).toBeInTheDocument();
  });

  it('renders Loading text when data is loading', async () => {
    mockUseApi.mockImplementationOnce(() => {});

    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <CountryInfo iso2='JP' />
      </Wrapper>
    );

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });

  it('shows error message when API fails', async () => {
    mockUseApi.mockRejectedValueOnce(new Error('Test to simulate API failure'));

    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <CountryInfo iso2='JP' />
      </Wrapper>
    );

    expect(await screen.findByTestId('country-info-error')).toBeInTheDocument();
  });
});
