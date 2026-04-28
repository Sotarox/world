'use client';

import { useApi } from '@/api/use-api';
import { type Country } from '@/model/country';
import 'flag-icons/css/flag-icons.min.css';
import { CountryInfo } from './country-info';
import { CountryInfoTopics } from './country-info-topics';

function CountryInfoWrapper({ iso2 }: { iso2: string }) {
  const { data: countryData, error: countryError } = useApi<Country>(
    `/countries/${iso2}`
  );

  if (countryError) {
    // return <span className='pl-2'>Error loading country data</span>;
  }
  return (
    <div className='pb-2 sm:pb-0 flex flex-col gap-3'>
      <CountryInfo iso2={iso2} />
      {countryData && <CountryInfoTopics iso2={iso2} country={countryData} />}
    </div>
  );
}

CountryInfoWrapper.displayName = 'CountryInfoWrapper';
export { CountryInfoWrapper };
