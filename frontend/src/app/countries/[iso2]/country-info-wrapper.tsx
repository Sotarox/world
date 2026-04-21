'use client';

import { useApi } from '@/api/use-api';
import { type ACCountry } from '@/model/ac-country';
import { type Country } from '@/model/country';
import {
  nextCountryNav,
  previousCountryNav,
} from '@/model/country-iso2-name-map';
import { useCountryNav } from '@/store/country-nav-store';
import 'flag-icons/css/flag-icons.min.css';
import { CountryInfo } from './country-info';
import { CountryInfoTopics } from './country-info-topics';

function CountryInfoWrapper({ iso2 }: { iso2: string }) {
  const { data: countryData, error: countryError } = useApi<Country>(
    `/countries/${iso2}`
  );
  const { data: accountryData, error: accountryError } = useApi<ACCountry>(
    `/accountries/${iso2}`
  );

  const countryNavs = useCountryNav((s) => s.countries);
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
        <CountryInfoTopics iso2={iso2} country={countryData} />
      </div>
    );
  } else {
    return <></>;
  }
}

CountryInfoWrapper.displayName = 'CountryInfoWrapper';
export { CountryInfoWrapper };
