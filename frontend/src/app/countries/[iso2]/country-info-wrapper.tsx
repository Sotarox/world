'use client';

import { useApi } from '@/api/use-api';
import { AirportList } from '@/app/countries/[iso2]/airport-list';
import { PopulationInfo } from '@/app/countries/[iso2]/population-info';
import { Card } from '@/components/shadcn/card';
import { Separator } from '@/components/shadcn/separator';
import { CountryInfo } from '@/components/world/country-info';
import { EconomyInfo } from '@/components/world/economy-info';
import { PopulationChart } from '@/components/world/population-chart';
import { type ACCountry } from '@/model/ac-country';
import { type Country } from '@/model/country';
import { useCountryNav } from '@/store/country-nav-store';
import { useTopicStore } from '@/store/topic-store';
import 'flag-icons/css/flag-icons.min.css';
import { useMemo } from 'react';
import { PrevNext } from './prev-next';

function CountryInfoWrapper({ iso2 }: { iso2: string }) {
  const { data: countryApiData } = useApi<Country>(`/countries/${iso2}`);
  const { data: acCountryApiData } = useApi<ACCountry>(`/accountries/${iso2}`);

  const { currentTopic } = useTopicStore();
  const countryNavs = useCountryNav((s) => s.countries);
  const countryNavsSortedByPopulation = useMemo(
    () =>
      [...countryNavs].sort(
        (a, b) => (b.population ?? 0) - (a.population ?? 0)
      ),
    [countryNavs]
  );

  if (countryApiData && acCountryApiData) {
    return (
      <div className='pb-2 sm:pb-0 flex flex-col gap-3'>
        <CountryInfo
          iso2={iso2}
          acCountry={acCountryApiData}
          country={countryApiData}
          sizeAirports={countryApiData.totalNumberOfAirports}
        />
        <PrevNext iso2={iso2} />
        <Separator />
        {currentTopic === 'population' && (
          <Card className='p-4'>
            <PopulationInfo
              countryIso2={iso2}
              continentCode={countryApiData.continent}
            />
            <PopulationChart
              data={countryNavsSortedByPopulation}
              selectedIso2={iso2}
            />
          </Card>
        )}
        <AirportList
          countryIso2={iso2}
          isVisible={currentTopic === 'airports'}
        />
        <EconomyInfo iso2={iso2} isVisible={currentTopic === 'economy'} />
      </div>
    );
  } else {
    return <></>;
  }
}

CountryInfoWrapper.displayName = 'CountryInfoWrapper';
export { CountryInfoWrapper };
