import { useEffect, useState } from 'react';
import { Card } from '@/components/shadcn/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/shadcn/accordion';
import { AccordionTrigger } from '@/components/custom/accordion';
import { cn } from '@/lib/utils';
import { WbEconomyInfo, WbEconomyWrapper } from '@/model/wb-economy';
import { useApi } from '@/api/use-api';
import InfoCard from './info-card';
import { formatGdpValue } from '@/utils/utils';
import { GdpChart } from '@/components/world/gdp-chart';
import { useTopicStore } from '@/store/topic-store';
import Grid from '@mui/material/Grid';

interface EconomyCardProps {
  iso2: string;
}

function EconomyCard(props: EconomyCardProps) {
  const { iso2 } = props;
  const [gdpData, setGdpData] = useState<WbEconomyInfo[]>([]);
  const { currentTopic, toggleCurrentTopic } = useTopicStore();
  const isSelected = currentTopic === 'economy';

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

  const onValueChange = () => {
    if (isSelected) {
      toggleCurrentTopic('');
    } else {
      toggleCurrentTopic('economy');
    }
  };

  return (
    <Card
      className={cn(
        'min-w-0 overflow-hidden p-2',
        isSelected && 'col-span-full'
      )}
    >
      <Accordion
        type='single'
        collapsible
        value={currentTopic}
        onValueChange={onValueChange}
        className='w-full px-2 py-0'
      >
        <AccordionItem value='economy'>
          <AccordionTrigger>
            <div className='flex min-w-0 flex-col'>
              <span className='text-lg font-extralight block truncate'>
                Economy
              </span>
              {!isSelected && (
                <span className='text-base block truncate'>
                  {economyWrapper?.data?.[economyWrapper.data.length - 1]
                    ?.gdpValue
                    ? `$${formatGdpValue(economyWrapper.data[economyWrapper.data.length - 1].gdpValue, false)} USD`
                    : 'N/A'}
                </span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
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
                  <Grid size={{ xs: 12 }}>
                    <span className='text-base p-2 text-quiet col-span-full'>
                      {`Year: ${economyWrapper?.data?.[economyWrapper.data.length - 1]?.year}`}
                    </span>
                  </Grid>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

EconomyCard.displayName = 'EconomyCard';
export default EconomyCard;
