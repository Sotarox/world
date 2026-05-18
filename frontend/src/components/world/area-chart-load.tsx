import { CountryNavChart } from '@/components/world/country-nav-chart';
import { useCountryNav } from '@/store/country-nav-store';
import { formatChartValue } from '@/utils/utils';
import { useMemo } from 'react';
import { ChartConfig } from '../shadcn/chart';

interface AreaChartLoadProps {
  iso2: string;
}

function AreaChartLoad(props: AreaChartLoadProps) {
  const { iso2 } = props;
  const countryNavs = useCountryNav((s) => s.countries);
  const countryNavsSortedByArea = useMemo(
    () => [...countryNavs].sort((a, b) => (b.area ?? 0) - (a.area ?? 0)),
    [countryNavs]
  );
  const formatArea = (value: number): string => {
    const largestArea = Math.max(
      ...countryNavsSortedByArea.map((country) => country.area ?? 0)
    );
    return formatChartValue(value, largestArea);
  };

  return (
    <CountryNavChart
      data={countryNavsSortedByArea}
      selectedIso2={iso2}
      chartConfig={{ area: { label: 'Area' } } satisfies ChartConfig}
      xAxisDataKey='area'
      xAxisFormatter={formatArea}
    />
  );
}

export { AreaChartLoad };
