import { PopulationChart } from '@/components/world/population-chart';
import { useCountryNav } from '@/store/country-nav-store';
import { useMemo } from 'react';

interface PopulationChartLoadProps {
  iso2: string;
}

function PopulationChartLoad(props: PopulationChartLoadProps) {
  const { iso2 } = props;
  const countryNavs = useCountryNav((s) => s.countries);
  const countryNavsSortedByPopulation = useMemo(
    () =>
      [...countryNavs].sort(
        (a, b) => (b.population ?? 0) - (a.population ?? 0)
      ),
    [countryNavs]
  );

  return (
    <PopulationChart data={countryNavsSortedByPopulation} selectedIso2={iso2} />
  );
}

export { PopulationChartLoad };
