import CountryInfoWrapper from './country-info-wrapper';
import { Suspense } from 'react';
import { countryIso2NameMap } from '@/model/CountryIso2NameMap';

export async function generateStaticParams() {
  return Object.keys(countryIso2NameMap).map((isotwo) => ({
    isotwo: isotwo.toLowerCase(),
  }));
}

export default function Page({ params }: PageProps<'/countries/[isotwo]'>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {params.then(({ isotwo }) => (
        <CountryInfoWrapper isotwo={isotwo} />
      ))}
    </Suspense>
  );
}
