import { AreaChart } from '@/components/world/area-chart';
import { useCountryNav } from '@/store/country-nav-store';
import { useMemo } from 'react';

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

  return <AreaChart data={countryNavsSortedByArea} selectedIso2={iso2} />;
}

export { AreaChartLoad };
