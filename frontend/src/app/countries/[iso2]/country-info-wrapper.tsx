'use client';

import { useApi } from '@/api/use-api';
import { AirportList } from '@/app/countries/[iso2]/airport-list';
import { PopulationInfo } from '@/app/countries/[iso2]/population-info';
import { CountryInfo } from './country-info';
import { type ACCountry } from '@/model/ac-country';
import { type Country } from '@/model/country';
import { useCountryNav } from '@/store/country-nav-store';
import { useTopicStore } from '@/store/topic-store';
import 'flag-icons/css/flag-icons.min.css';
import { useMemo } from 'react';
import {
  nextCountryNav,
  previousCountryNav,
} from '@/model/country-iso2-name-map';

function CountryInfoWrapper({ iso2 }: { iso2: string }) {
  const { data: countryData, error: countryError } = useApi<Country>(
    `/countries/${iso2}`
  );
  const { data: accountryData, error: accountryError } = useApi<ACCountry>(
    `/accountries/${iso2}`
  );

  const { currentTopic } = useTopicStore();
  const countryNavs = useCountryNav((s) => s.countries);
  const countryNavsSortedByPopulation = useMemo(
    () =>
      [...countryNavs].sort(
        (a, b) => (b.population ?? 0) - (a.population ?? 0)
      ),
    [countryNavs]
  );
  const previousNav = previousCountryNav(iso2.toUpperCase(), countryNavs);
  const nextNav = nextCountryNav(iso2.toUpperCase(), countryNavs);

  if (countryError || accountryError) {
    return <span className='pl-2'>Error loading country data</span>;
  }
  if (countryData && accountryData) {
    return (
      <div className='pb-2 sm:pb-0 flex flex-col gap-3'>
        <CountryInfo
          iso2={iso2}
          acCountry={accountryData}
          country={countryData}
          previousNav={previousNav}
          nextNav={nextNav}
        />
        <PopulationInfo
          iso2={iso2}
          continentCode={countryData.continent}
          data={countryNavsSortedByPopulation}
          isVisible={currentTopic === 'population'}
        />
        <AirportList iso2={iso2} isVisible={currentTopic === 'airports'} />
      </div>
    );
  } else {
    return <></>;
  }
}

CountryInfoWrapper.displayName = 'CountryInfoWrapper';
export { CountryInfoWrapper };
