import { fireEvent, render, screen } from '@testing-library/react';
import { CountryFilter } from '@/components/world/country-filter';
import { useRegionFilter } from '../store/region-filter-store';
import { RegionType } from '@/model/ac-country';

describe('CountryFilter Component', () => {
  it('click on filter button opens the dialog', async () => {
    render(<CountryFilter />);
    fireEvent.click(
      screen.getByRole('button', { name: /Open filter dialog/i })
    );
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('when filter is not applied, all checkboxes are unchecked', async () => {
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
    useRegionFilter
      .getState()
      .setRegions(['Africa', 'Oceania'] as RegionType[]);

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

  it('selecting a region persists after dialog reopen', async () => {
    useRegionFilter
      .getState()
      .setRegions(['Africa', 'Oceania'] as RegionType[]);

    render(<CountryFilter />);

    fireEvent.click(
      screen.getByRole('button', { name: /Open filter dialog/i })
    );
    fireEvent.click(screen.getByLabelText('Africa'));
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    fireEvent.click(
      screen.getByRole('button', { name: /Open filter dialog/i })
    );
    expect(screen.getByLabelText('Africa')).toBeChecked();
  });
});
