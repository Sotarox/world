'use client';

import { Country } from '@/model/country';
import { CountryInfoTopics } from './country-info-topics';
import { useApi } from '@/api/use-api';
import { ACCountry } from '@/model/ac-country';

function CountryInfoTopicsLoad({ iso2 }: { iso2: string }) {
  const { data: country, error: countryError } = useApi<Country>(
    `/countries/${iso2}`
  );
  const { data: acCountry, error: acCountryError } = useApi<ACCountry>(
    `/accountries/${iso2}`
  );

  if (countryError || acCountryError) {
    return <span className='pl-2'>Error loading country data</span>;
  } else if (country && acCountry) {
    return (
      <CountryInfoTopics iso2={iso2} country={country} acCountry={acCountry} />
    );
  } else return null;
}

CountryInfoTopicsLoad.displayName = 'CountryInfoTopicsLoad';
export { CountryInfoTopicsLoad };
