import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { type Country } from '../model/Country';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { CircleFlag } from 'react-circle-flags';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface CountryInfoHeaderProps {
  country: Country;
}
function CountryInfoHeader(props: CountryInfoHeaderProps) {
  const { country } = props;
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

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
      <Typography
        variant={isXs ? 'h3' : 'h2'}
        sx={{
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {country.countryName}
      </Typography>
    </Grid>
  );
}

export default CountryInfoHeader;
