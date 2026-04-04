import { useApi } from '@/api/use-api';
import { WbEconomyInfo, WbEconomyWrapper } from '@/model/wb-economy';
import { formatGdpValue } from '@/utils/utils';
import InfoCard from './info-card';
import { Card } from '../shadcn/card';
import { GdpChart } from '@/components/world/gdp-chart';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

interface EconomyInfoProps {
  iso2: string;
  isVisible: boolean;
}

function EconomyInfo({ iso2, isVisible }: EconomyInfoProps) {
  const [gdpData, setGdpData] = useState<WbEconomyInfo[]>([]);
  const {
    data: economyWrapper,
    error,
    loading,
  } = useApi<WbEconomyWrapper>(`/economy/${iso2}`);

  useEffect(() => {
    if (economyWrapper?.data) {
      setGdpData(
        economyWrapper.data.sort((a, b) => parseInt(a.year) - parseInt(b.year))
      );
    }
  }, [economyWrapper]);

  if (!isVisible) return null;
  return (
    <Card className='p-4'>
      <Grid container spacing={1}>
        <Grid
          size={{ xs: 12 }}
          sx={{ display: 'flex', paddingX: 1, justifyContent: 'space-between' }}
        >
          <span className='text-lg font-extralight'>Economy</span>
          <span className='text-base text-gray-300 dark:text-gray-700'>
            {`Year: ${economyWrapper?.data?.[economyWrapper.data.length - 1]?.year}`}
          </span>
        </Grid>
        {loading ? (
          <Grid size={{ xs: 12 }}>
            <span className='pl-2'>Loading...</span>
          </Grid>
        ) : error ? (
          <Grid size={{ xs: 12 }}>
            <span className='pl-2'>Error loading economy data</span>
          </Grid>
        ) : (
          <>
            <Grid size={{ xs: 6, md: 3 }}>
              <InfoCard
                title='GDP'
                value={
                  economyWrapper?.data?.[economyWrapper.data.length - 1]
                    ?.gdpValue
                    ? `$${formatGdpValue(economyWrapper.data[economyWrapper.data.length - 1].gdpValue, false)} USD`
                    : 'N/A'
                }
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <InfoCard
                title='Growth rate'
                value={
                  economyWrapper?.data?.[economyWrapper.data.length - 1]
                    ?.growthRate
                    ? `${economyWrapper.data[economyWrapper.data.length - 1].growthRate.toFixed(2)}%`
                    : 'N/A'
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <GdpChart data={gdpData} />
            </Grid>
          </>
        )}
      </Grid>
    </Card>
  );
}

EconomyInfo.displayName = 'CountryInfoEconomy';
export { EconomyInfo };
