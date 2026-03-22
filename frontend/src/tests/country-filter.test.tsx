import { fireEvent, render, screen } from '@testing-library/react';
import { CountryFilter } from '@/components/world/country-filter';
import { useRegionFilter } from '../store/region-filter-store';
import { RegionType } from '@/model/ac-country';

jest.mock('../store/region-filter-store', () => ({
  useRegionFilter: jest.fn(),
}));

const mockedUseRegionFilter = jest.mocked(useRegionFilter);

describe('CountryFilter Component', () => {
  it('click on filter button opens the dialog', async () => {
    const state = {
      regions: [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania',
        'Antarctic',
      ] as RegionType[],
      setRegions: jest.fn(),
    };

    mockedUseRegionFilter.mockImplementation((selector) => selector(state));
    render(<CountryFilter />);
    fireEvent.click(
      screen.getByRole('button', { name: /Open filter dialog/i })
    );
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('all checkboxes are unchecked when no filter is applied', async () => {
    const state = {
      regions: [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania',
        'Antarctic',
      ] as RegionType[],
      setRegions: jest.fn(),
    };

    mockedUseRegionFilter.mockImplementation((selector) => selector(state));
    render(<CountryFilter />);
    fireEvent.click(
      screen.getByRole('button', { name: /Open filter dialog/i })
    );
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it('when countries are filtered, corresponding checkboxes are checked', async () => {
    const state = {
      regions: ['Africa', 'Oceania'] as RegionType[],
      setRegions: jest.fn(),
    };

    mockedUseRegionFilter.mockImplementation((selector) => selector(state));
    render(<CountryFilter />);
    fireEvent.click(
      screen.getByRole('button', { name: /Open filter dialog/i })
    );
    const checkboxAfrica = screen.getByLabelText('Africa');
    const checkboxOceania = screen.getByLabelText('Oceania');
    const checkboxEurope = screen.getByLabelText('Europe');
    const checkboxAmericas = screen.getByLabelText('Americas');
    const checkboxAsia = screen.getByLabelText('Asia');
    const checkboxAntarctic = screen.getByLabelText('Antarctic');

    expect(checkboxAfrica).toBeChecked();
    expect(checkboxOceania).toBeChecked();
    expect(checkboxEurope).not.toBeChecked();
    expect(checkboxAmericas).not.toBeChecked();
    expect(checkboxAsia).not.toBeChecked();
    expect(checkboxAntarctic).not.toBeChecked();
  });
});
