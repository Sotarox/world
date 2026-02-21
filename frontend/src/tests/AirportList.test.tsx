// AirportList.test.tsx
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import AirportList from '../old-pages/AirportList';
import type { Airport } from '../model/Airport';

jest.mock('../api/useApi', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useApi from '../api/useApi';

describe('AirportList Component', () => {
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

  test('renders airports when isVisible is true and airports are available', () => {
    (useApi as jest.Mock).mockReturnValue(mockAirports);

    render(<AirportList countryIso2='DE' isVisible={true} />);

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

  test('renders no airport when isVisible is false', () => {
    (useApi as jest.Mock).mockReturnValue(mockAirports);

    render(<AirportList countryIso2='DE' isVisible={false} />);

    expect(screen.queryByText('Augsburg - Muehlhausen')).toBeNull();
  });
});
