import { useEffect, useState } from 'react';
import { Card } from '@/components/shadcn/card';
import { cn } from '@/lib/utils';
import { WbEconomyInfo, WbEconomyWrapper } from '@/model/wb-economy';
import { useApi } from '@/api/use-api';
import InfoCard from './info-card';
import { formatGdpValue } from '@/utils/utils';
import { GdpChart } from '@/components/world/gdp-chart';
import { useTopicStore } from '@/store/topic-store';
import Grid from '@mui/material/Grid';
import { KeyboardArrowRight, KeyboardArrowDown } from '@mui/icons-material';

interface EconomyCardProps {
  iso2: string;
}

function EconomyCard(props: EconomyCardProps) {
  const { iso2 } = props;
  const [economyData, setEconomyData] = useState<WbEconomyInfo[]>([]);
  const [newestAnnualData, setNewestAnnualData] = useState<{
    year: string;
    gdpValue: string;
    growthRate: string;
  }>({ year: 'N/A', gdpValue: 'N/A', growthRate: 'N/A' });
  const { currentTopic, toggleCurrentTopic } = useTopicStore();
  const isSelected = currentTopic === 'economy';

  const {
    data: economyWrapper,
    error,
    loading,
  } = useApi<WbEconomyWrapper>(`/economy/${iso2}`);

  useEffect(() => {
    if (economyWrapper?.data) {
      setEconomyData(
        economyWrapper.data.sort((a, b) => parseInt(a.year) - parseInt(b.year))
      );
      const latestData = economyWrapper.data[economyWrapper.data.length - 1];
      setNewestAnnualData({
        year: latestData.year,
        gdpValue: latestData.gdpValue
          ? `$${formatGdpValue(latestData.gdpValue, false)} USD`
          : 'N/A',
        growthRate: latestData.growthRate
          ? `${latestData.growthRate.toFixed(2)}%`
          : 'N/A',
      });
    }
  }, [economyWrapper]);

  const onClick = () => {
    if (isSelected) {
      toggleCurrentTopic('');
    } else {
      toggleCurrentTopic('economy');
    }
  };

  return (
    <Card
      className={cn(
        'w-full min-w-0 overflow-hidden p-2 gap-1',
        isSelected && 'col-span-full'
      )}
    >
      <button className='w-full min-w-0' onClick={() => onClick()}>
        <div className='flex w-full min-w-0 items-center justify-between rounded-sm text-left hover:bg-neutral-500/5 dark:hover:bg-gt-subtle/70'>
          <div className='flex min-w-0 flex-1'>
            {isSelected ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
            <div className='flex min-w-0 flex-1 flex-col'>
              <span className='block truncate text-lg font-extralight'>
                Economy
              </span>
              <span className='block truncate text-base'>
                {!isSelected && error && 'Error'}
                {!isSelected && loading && 'Loading...'}
                {!isSelected && !loading && !error && newestAnnualData.gdpValue}
              </span>
            </div>
          </div>
          {isSelected && !loading && !error && (
            <span className='min-w-0 truncate pr-1 text-base text-quiet'>
              {`Year: ${newestAnnualData.year}`}
            </span>
          )}
        </div>
      </button>
      {isSelected && (
        <Grid container spacing={1}>
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
                  value={newestAnnualData.gdpValue}
                  className='p-0 px-2'
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <InfoCard
                  title='Growth rate'
                  value={newestAnnualData.growthRate}
                  className='p-0 px-2'
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <GdpChart data={economyData} />
              </Grid>
            </>
          )}
        </Grid>
      )}
    </Card>
  );
}

EconomyCard.displayName = 'EconomyCard';
export { EconomyCard };
