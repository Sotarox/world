import React from 'react';
import { type Country } from '@/model/country';
import 'flag-icons/css/flag-icons.min.css';
import { CircleFlag } from 'react-circle-flags';

interface CountryInfoHeaderProps {
  country: Country;
}
function CountryInfoHeader(props: CountryInfoHeaderProps) {
  const { country } = props;

  return (
    <div className='flex items-center justify-center gap-2 w-full'>
      <CircleFlag
        countryCode={country.countryIso2.toLowerCase()}
        height='50'
        width='50'
      />
      <h3 className='text-6xl max-w-full overflow-hidden text-ellipsis leading-normal'>
        {country.countryName}
      </h3>
    </div>
  );
}

export default CountryInfoHeader;
