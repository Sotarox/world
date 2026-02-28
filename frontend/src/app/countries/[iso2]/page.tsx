import CountryInfoWrapper from './country-info-wrapper';
import { Suspense } from 'react';
import { countryIso2NameMap } from '@/model/country-iso2-name-map';

export async function generateStaticParams() {
  return countryIso2NameMap.map((country) => ({
    iso2: country.countryIso2.toLowerCase(),
  }));
}

export default function Page({ params }: PageProps<'/countries/[iso2]'>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {params.then(({ iso2 }) => (
        <CountryInfoWrapper iso2={iso2} />
      ))}
    </Suspense>
  );
}
