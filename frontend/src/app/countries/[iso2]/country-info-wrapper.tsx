'use client';

import 'flag-icons/css/flag-icons.min.css';
import { CountryInfo } from './country-info';
import { CountryInfoTopicsLoad } from './country-info-topics-load';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const switchVisibility = (callback: () => void) => {
  setTimeout(() => {
    callback();
  }, 400);
};

function CountryInfoWrapper({ iso2 }: { iso2: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    switchVisibility(() => setVisible(true));
  }, []);

  return (
    <div className='p-2'>
      <div
        className={cn(
          'sm:pb-0 flex flex-col gap-3',
          'transition-all duration-700 ease-in-out w-full',
          visible ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'
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
