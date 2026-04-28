'use client';

import 'flag-icons/css/flag-icons.min.css';
import { CountryInfo } from './country-info';
import { CountryInfoTopicsLoad } from './country-info-topics-load';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const switchVisibility = (callback: () => void) => {
  setTimeout(() => {
    callback();
  }, 400);
};

function CountryInfoWrapper({ iso2 }: { iso2: string }) {
  const [visible, setVisible] = useState(false);
  switchVisibility(() => setVisible(true));

  return (
    <div className='p-2 sm:pb-0 flex flex-col gap-3 relative'>
      <div
        className={cn(
          'transition-all duration-800 ease-in-out absolute w-full',
          visible ? 'left-0 opacity-100' : '-left-80 opacity-0'
        )}
      >
        <CountryInfo iso2={iso2} />
        <CountryInfoTopicsLoad iso2={iso2} />
      </div>
    </div>
  );
}

CountryInfoWrapper.displayName = 'CountryInfoWrapper';
export { CountryInfoWrapper };
