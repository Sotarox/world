import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { type Airport } from '../model/Airport';
import InfoCard from '../components/InfoCard';
import { Item } from '../components/Item';
import { formatCoordinate } from '../utils/utils';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';

interface AirportInfoProps {
  airport: Airport | null;
}

function AirportInfo(props: AirportInfoProps) {
  const { airport } = props;

  if (airport !== null) {
    return (
      <Item sx={{ mb: 3 }}>
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
      </Item>
    );
  } else {
    return (
      <>
        <p>No Data</p>
      </>
    );
  }
}

export default AirportInfo;
