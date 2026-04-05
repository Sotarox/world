import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { AirportList } from '@/app/countries/[iso2]/airport-list';
import type { Airport } from '@/model/airport';

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

jest.mock('../api/use-api', () => ({
  useApi: () => ({ data: mockAirports }),
}));

describe('AirportList Component', () => {
  it('renders airports when isVisible is true and airports are available', () => {
    render(<AirportList iso2='DE' isVisible={true} />);

    expect(screen.getByText('Augsburg - Muehlhausen')).toBeInTheDocument();
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

  it('renders no airport when isVisible is false', () => {
    render(<AirportList iso2='DE' isVisible={false} />);

    expect(screen.queryByText('Augsburg - Muehlhausen')).toBeNull();
  });
});
