import { AirportList } from '@/app/countries/[iso2]/airport-list';
import type { Airport } from '@/model/airport';
import { render, screen, within } from '@testing-library/react';
import { createWrapper } from './test-utils';

const mockAirports: Airport[] = [
  {
    dbId: 0,
    iataCode: 'AGB',
    cityIataCode: 'MUC',
    airportName: 'Augsburg - Muehlhausen',
    countryName: 'Germany',
  },
  {
    dbId: 1,
    iataCode: 'BRE',
    cityIataCode: 'BRE',
    airportName: 'Bremen',
    countryName: 'Germany',
  },
] as Airport[];

jest.mock('../api/axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: mockAirports })),
  },
}));

describe('AirportList Component', () => {
  it('renders airports when isVisible is true and airports are available', async () => {
    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <AirportList iso2='DE' />
      </Wrapper>
    );

    expect(
      await screen.findByText('Augsburg - Muehlhausen')
    ).toBeInTheDocument();
    expect(screen.getByText('Bremen')).toBeInTheDocument();

    const iataCodeParentDivs = screen
      .getAllByText('IATA Code')
      .map((element) => element.closest('div')!);
    expect(
      iataCodeParentDivs.find((div) => within(div).queryByText('AGB'))
    ).toBeTruthy();
    expect(
      iataCodeParentDivs.find((div) => within(div).queryByText('BRE'))
    ).toBeTruthy();

    const cityIataCodeParentDivs = screen
      .getAllByText('City IATA Code')
      .map((element) => element.closest('div')!);
    expect(
      cityIataCodeParentDivs.find((div) => within(div).queryByText('MUC'))
    ).toBeTruthy();
    expect(
      cityIataCodeParentDivs.find((div) => within(div).queryByText('BRE'))
    ).toBeTruthy();
  });
});
