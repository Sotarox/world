'use client';

import { Country } from '@/model/country';
import { CountryInfoTopics } from './country-info-topics';
import { ACCountry } from '@/model/ac-country';
import api from '@/api/axios';
import { useQuery } from '@tanstack/react-query';

function CountryInfoTopicsLoad({ iso2 }: { iso2: string }) {
  const {
    data: country,
    isLoading: isCountryLoading,
    isError: isCountryError,
  } = useQuery({
    queryKey: ['countries', iso2],
    queryFn: () =>
      api.get<Country>(`/countries/${iso2}`).then((res) => res.data),
  });
  const {
    data: acCountry,
    isLoading: isACCountryLoading,
    isError: isACCountryError,
  } = useQuery({
    queryKey: ['accountries', iso2],
    queryFn: () =>
      api.get<ACCountry>(`/accountries/${iso2}`).then((res) => res.data),
  });

  if (isCountryLoading || isACCountryLoading) {
    return <span className='pl-2'>Loading country data...</span>;
  }
  if (isCountryError || isACCountryError) {
    return <span className='pl-2'>Error loading country data</span>;
  } else if (country && acCountry) {
    return (
      <CountryInfoTopics iso2={iso2} country={country} acCountry={acCountry} />
    );
  } else return null;
}

CountryInfoTopicsLoad.displayName = 'CountryInfoTopicsLoad';
export { CountryInfoTopicsLoad };
