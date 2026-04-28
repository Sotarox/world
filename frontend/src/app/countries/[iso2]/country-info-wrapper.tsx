'use client';

import 'flag-icons/css/flag-icons.min.css';
import { CountryInfo } from './country-info';
import { CountryInfoTopicsLoad } from './country-info-topics-load';

function CountryInfoWrapper({ iso2 }: { iso2: string }) {
  return (
    <div className='pb-2 sm:pb-0 flex flex-col gap-3'>
      <CountryInfo iso2={iso2} />
      <CountryInfoTopicsLoad iso2={iso2} />
    </div>
  );
}

CountryInfoWrapper.displayName = 'CountryInfoWrapper';
export { CountryInfoWrapper };
