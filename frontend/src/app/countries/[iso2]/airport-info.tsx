import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { type Airport } from '@/model/airport';
import InfoCard from '@/components/world/info-card';
import { formatCoordinate } from '@/utils/utils';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import { Card } from '@/components/shadcn/card';

interface AirportInfoProps {
  airport: Airport | null;
}

function AirportInfo(props: AirportInfoProps) {
  const { airport } = props;

  if (airport !== null) {
    return (
      <Card className='p-4'>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12 }} sx={{ display: 'flex', gap: 0.5 }}>
            <LocalAirportIcon fontSize='large' />
            <Typography variant='h4'>{airport.airportName ?? 'N/A'}</Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <InfoCard
              title='Coordinate'
              value={formatCoordinate([
                Number(airport.latitude),
                Number(airport.longitude),
              ])}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <InfoCard title='IATA Code' value={airport.iataCode ?? 'N/A'} />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <InfoCard
              title='City IATA Code'
              value={airport.cityIataCode ?? 'N/A'}
            />
          </Grid>
        </Grid>
      </Card>
    );
  } else {
    return (
      <>
        <p>No Data</p>
      </>
    );
  }
}

export { AirportInfo };
