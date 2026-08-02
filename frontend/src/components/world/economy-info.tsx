import { memo } from 'react';
import InfoCard from './info-card';
import { Card } from '@/components/world/card';
import { GdpChart } from '@/components/world/gdp-chart';
import Grid from '@mui/material/Grid';
import { EconomyApiResult } from '@/api/use-economy-api';

interface EconomyInfoProps {
  economyApiResult: EconomyApiResult;
}

const EconomyInfo = memo(function EconomyInfo({
  economyApiResult,
}: EconomyInfoProps) {
  const { seriesData, newestAnnualData, error, isPending, isError } =
    economyApiResult;

  return (
    <Card className='p-4'>
      <Grid container spacing={1}>
        <Grid
          size={{ xs: 12 }}
          sx={{ display: 'flex', paddingX: 1, justifyContent: 'space-between' }}
        >
          <span className='text-lg font-extralight'>Economy</span>
          <span className='text-base text-quiet'>
            {`Year: ${newestAnnualData.year}`}
          </span>
        </Grid>
        {isPending ? (
          <Grid size={{ xs: 12 }}>
            <span className='pl-2'>Loading...</span>
          </Grid>
        ) : isError ? (
          <Grid size={{ xs: 12 }}>
            <span className='pl-2'>
              Error loading economy data {error?.message}
            </span>
          </Grid>
        ) : (
          <>
            <Grid size={{ xs: 6, md: 3 }}>
              <InfoCard title='GDP' value={newestAnnualData.gdpValue} />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <InfoCard
                title='Growth rate'
                value={newestAnnualData.growthRate}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <GdpChart data={seriesData} />
            </Grid>
          </>
        )}
      </Grid>
    </Card>
  );
});

EconomyInfo.displayName = 'CountryInfoEconomy';
export { EconomyInfo };
