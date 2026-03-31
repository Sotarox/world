import { useApi } from '@/api/use-api';
import { WbEconomyInfo, WbEconomyWrapper } from '@/model/wb-economy';
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from '@/components/shadcn/accordion';
import { formatGdpValue } from '@/utils/utils';
import InfoCard from './info-card';
import { Card } from '../shadcn/card';
import { GdpChart } from '@/components/world/gdp-chart';
import { useEffect, useState } from 'react';

interface EconomyInfoProps {
  iso2: string;
}

function CountryInfoEconomy({ iso2 }: EconomyInfoProps) {
  const [gdpData, setGdpData] = useState<WbEconomyInfo[]>([]);
  const economyWrapper = useApi<WbEconomyWrapper>(`/economy/${iso2}`);

  useEffect(() => {
    if (economyWrapper?.data) {
      setGdpData(
        economyWrapper.data.sort((a, b) => parseInt(a.year) - parseInt(b.year))
      );
    }
  }, [economyWrapper]);

  return (
    <Card className='p-4'>
      <Accordion type='single' collapsible className='w-full'>
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

CountryInfoEconomy.displayName = 'CountryInfoEconomy';
export { CountryInfoEconomy };
