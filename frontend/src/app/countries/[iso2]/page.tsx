import CountryInfoWrapper from './country-info-wrapper';
import { Suspense } from 'react';
import { countryIso2NameMap } from '@/model/CountryIso2NameMap';

export async function generateStaticParams() {
  return Object.keys(countryIso2NameMap).map((iso2) => ({
    iso2: iso2.toLowerCase(),
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
