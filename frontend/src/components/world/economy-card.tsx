import { useEffect, useState } from 'react';
import { Card } from '@/components/shadcn/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn/accordion';
import { cn } from '@/lib/utils';
import { WbEconomyInfo, WbEconomyWrapper } from '@/model/wb-economy';
import { useApi } from '@/api/use-api';
import InfoCard from './info-card';
import { formatGdpValue } from '@/utils/utils';
import { GdpChart } from '@/components/world/gdp-chart';
import { useTopicStore } from '@/store/topic-store';

interface EconomyCardProps {
  iso2: string;
}

function EconomyCard(props: EconomyCardProps) {
  const { iso2 } = props;
  const [gdpData, setGdpData] = useState<WbEconomyInfo[]>([]);
  const { currentTopic, toggleCurrentTopic } = useTopicStore();

  const { data: economyWrapper } = useApi<WbEconomyWrapper>(`/economy/${iso2}`);

  useEffect(() => {
    if (economyWrapper?.data) {
      setGdpData(
        economyWrapper.data.sort((a, b) => parseInt(a.year) - parseInt(b.year))
      );
    }
  }, [economyWrapper]);

  const onValueChange = () => {
    if (currentTopic === 'economy') {
      toggleCurrentTopic('');
    } else {
      toggleCurrentTopic('economy');
    }
  };

  return (
    <Card className={cn('p-4', currentTopic === 'economy' && 'col-span-full')}>
      <Accordion
        type='single'
        collapsible
        value={currentTopic}
        onValueChange={onValueChange}
        className='w-full'
      >
        <AccordionItem value='economy'>
          <AccordionTrigger>
            <span className='text-lg'>{`Economy (${economyWrapper?.data?.[economyWrapper.data.length - 1]?.year})`}</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className='flex-col w-full'>
              <div className='flex items-center justify-between w-full'>
                <InfoCard
                  title='GDP'
                  value={
                    economyWrapper?.data?.[economyWrapper.data.length - 1]
                      ?.gdpValue
                      ? `$${formatGdpValue(economyWrapper.data[economyWrapper.data.length - 1].gdpValue, false)} USD`
                      : 'N/A'
                  }
                />
                <InfoCard
                  title='Growth rate'
                  value={
                    economyWrapper?.data?.[economyWrapper.data.length - 1]
                      ?.growthRate
                      ? `${economyWrapper.data[economyWrapper.data.length - 1].growthRate.toFixed(2)}%`
                      : 'N/A'
                  }
                />
                <GdpChart data={gdpData} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

export default EconomyCard;
