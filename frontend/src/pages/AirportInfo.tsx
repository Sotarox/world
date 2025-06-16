import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import {type Airport} from '../model/Airport';
import InfoCard from '../components/InfoCard';
import { Item } from '../components/Item';
import { formatCoordinate } from '../utils/utils';

interface AirportInfoProps {
  airport: Airport|null;
}

function AirportInfo(props: AirportInfoProps) {
  const { airport } = props;

  if (airport !== null) {
    return (
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={1}>
              <Grid size={{ xs: 12 }}>
                <Item>
                  <Typography variant="h4" style={{ fontWeight: 200 }}>
                    {airport.airportName}
                  </Typography>
                </Item>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <InfoCard title="Coordinate" value={formatCoordinate([Number(airport.latitude), Number(airport.longitude)])}/>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <InfoCard title="IATA Code" value={airport.iataCode}/>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <InfoCard title="City IATA Code" value={airport.cityIataCode}/>
              </Grid>
          </Grid>
        </Box>
      )
  } else {
    return (<><p>No Data</p></>);
  }
}

export default AirportInfo
