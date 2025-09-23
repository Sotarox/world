import React from 'react';
import Grid from '@mui/material/Grid';
import { type Country } from '../model/Country';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { CircleFlag } from 'react-circle-flags';

interface CountryInfoHeaderProps {
  country: Country;
}
function CountryInfoHeader(props: CountryInfoHeaderProps) {
  const { country } = props;

  return (
    <Grid
      size={12}
      sx={{
        p: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      <CircleFlag
        countryCode={country.countryIso2.toLowerCase()}
        height='50'
        width='50'
      />
      {/* for xs screens, use h3, otherwise h2 */}
      <h3 className='xs:text-6xl max-w-full overflow-hidden text-ellipsis'>
        {country.countryName}
      </h3>
    </Grid>
  );
}

export default CountryInfoHeader;
