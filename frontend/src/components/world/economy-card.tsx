import { useEconomyApi } from '@/api/use-economy-api';
import { Card } from '@/components/shadcn/card';
import { GdpChart } from '@/components/world/gdp-chart';
import { cn } from '@/lib/utils';
import { useTopicStore } from '@/store/topic-store';
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import InfoCard from './info-card';

interface EconomyCardProps {
  iso2: string;
}

function EconomyCard(props: EconomyCardProps) {
  const { iso2 } = props;
  const { seriesData, newestAnnualData, error, loading } = useEconomyApi(iso2);

  const { currentTopic, toggleCurrentTopic } = useTopicStore();
  const isSelected = currentTopic === 'economy';

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
                <GdpChart data={seriesData} />
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
