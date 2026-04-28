import React from 'react';
import 'flag-icons/css/flag-icons.min.css';
import { CircleFlag } from 'react-circle-flags';
import { ACCountry } from '@/model/ac-country';

interface CountryInfoHeaderProps {
  country: ACCountry | null;
}
function CountryInfoHeader(props: CountryInfoHeaderProps) {
  const { country } = props;

  return (
    <div className='flex items-center justify-center gap-2 w-full'>
      <CircleFlag
        countryCode={country?.alpha2Code.toLowerCase() || 'XX'}
        height='50'
        width='50'
      />
      <h3 className='text-6xl max-w-full overflow-hidden text-ellipsis leading-normal'>
        {country?.name || 'N/A'}
      </h3>
    </div>
  );
}

export default CountryInfoHeader;
