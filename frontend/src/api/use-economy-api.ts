import { useMemo } from 'react';
import { useApi } from './use-api';
import { WbEconomyInfo, WbEconomyWrapper } from '@/model/wb-economy';
import { formatGdpValue } from '@/utils/utils';

interface EconomyApiResult {
  seriesData: WbEconomyInfo[];
  newestAnnualData: {
    year: string;
    gdpValue: string;
    growthRate: string;
  };
  error: Error | null;
  loading: boolean;
}

function useEconomyApi(iso2: string): EconomyApiResult {
  const {
    data: economyWrapper,
    error,
    loading,
  } = useApi<WbEconomyWrapper>(`/economy/${iso2}`);

  const seriesData = useMemo(
    () =>
      economyWrapper?.data
        ? [...economyWrapper.data].sort(
            (a, b) => parseInt(a.year) - parseInt(b.year)
          )
        : [],
    [economyWrapper]
  );

  const newestAnnualData = useMemo(() => {
    const latest = economyWrapper?.data?.[economyWrapper.data.length - 1];
    return {
      year: latest?.year ?? 'N/A',
      gdpValue: latest?.gdpValue
        ? `$${formatGdpValue(latest.gdpValue, false)} USD`
        : 'N/A',
      growthRate: latest?.growthRate
        ? `${latest.growthRate.toFixed(2)}%`
        : 'N/A',
    };
  }, [economyWrapper]);

  return { seriesData, newestAnnualData, error, loading };
}

export { useEconomyApi };
