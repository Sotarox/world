'use client';

import { Country } from '@/model/country';
import { CountryInfoTopics } from './country-info-topics';
import { useApi } from '@/api/use-api';

function CountryInfoTopicsLoad({ iso2 }: { iso2: string }) {
  const { data: country, error: countryError } = useApi<Country>(
    `/countries/${iso2}`
  );

  if (countryError) {
    return <span className='pl-2'>Error loading country data</span>;
  } else if (country) {
    return <CountryInfoTopics iso2={iso2} country={country} />;
  } else return null;
}

CountryInfoTopicsLoad.displayName = 'CountryInfoTopicsLoad';
export { CountryInfoTopicsLoad };
