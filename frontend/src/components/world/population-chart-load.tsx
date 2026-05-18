import { CountryNavChart } from './country-nav-chart';
import { useCountryNav } from '@/store/country-nav-store';
import { useMemo } from 'react';
import { ChartConfig } from '../shadcn/chart';

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
  const formatPopulation = (value: number): string => {
    const largestPopulation = Math.max(
      ...countryNavsSortedByPopulation.map((country) => country.population ?? 0)
    );
    if (largestPopulation >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(1)}B`;
    } else if (largestPopulation >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    } else if (largestPopulation >= 1_000) {
      return `${(value / 1_000).toFixed(1)}K`;
    }
    return largestPopulation.toString();
  };

  return (
    <CountryNavChart
      data={countryNavsSortedByPopulation}
      selectedIso2={iso2}
      chartConfig={
        { population: { label: 'Population' } } satisfies ChartConfig
      }
      xAxisDataKey='population'
      xAxisFormatter={formatPopulation}
    />
  );
}

export { PopulationChartLoad };
