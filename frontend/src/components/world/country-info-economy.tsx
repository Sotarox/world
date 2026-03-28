import { useApi } from '@/api/use-api';
import { WbEconomyInfo, WbEconomyWrapper } from '@/model/wb-economy';
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from '@/components/shadcn/accordion';
// import { AccordionTrigger } from '@/components/custom/accordion';
import { formatGdpValue } from '@/utils/utils';
import InfoCard from './info-card';
import { Card } from '../shadcn/card';
import { GdpChart } from '@/components/world/gdp-chart';
import { useEffect, useState } from 'react';

function CountryInfoEconomy({ iso2 }: { iso2: string }) {
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
            <div className='flex-col'>
              <span className='text-lg'>Economy</span>
              <div className='flex items-center justify-between w-full'>
                <InfoCard
                  title='GDP Value'
                  value={
                    economyWrapper?.data[0]?.gdpValue
                      ? `$${formatGdpValue(economyWrapper.data[0].gdpValue)}`
                      : 'N/A'
                  }
                />
                <InfoCard
                  title='GDP Growth Rate'
                  value={
                    economyWrapper?.data[0]?.growthRate
                      ? `${economyWrapper.data[0].growthRate.toFixed(2)}%`
                      : 'N/A'
                  }
                />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <GdpChart data={gdpData} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

export { CountryInfoEconomy };
