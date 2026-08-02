import { useMemo } from 'react';
import { WbEconomyInfo, WbEconomyWrapper } from '@/model/wb-economy';
import { formatGdpValue } from '@/utils/utils';
import api from '@/api/axios';
import { useQuery } from '@tanstack/react-query';

interface EconomyApiResult {
  seriesData: WbEconomyInfo[];
  newestAnnualData: {
    year: string;
    gdpValue: string;
    growthRate: string;
  };
  error: Error | null;
  isPending: boolean;
  isError: boolean;
}

function useEconomyApi(iso2: string): EconomyApiResult {
  const {
    data: economyWrapper,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['economy', iso2],
    queryFn: () =>
      api.get<WbEconomyWrapper>(`/economy/${iso2}`).then((res) => res.data),
    retry: false,
    enabled: iso2 !== '',
  });

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

  return { seriesData, newestAnnualData, error, isPending, isError };
}

export { useEconomyApi, type EconomyApiResult };
