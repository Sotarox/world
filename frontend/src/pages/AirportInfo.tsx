import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {type Airport} from '../model/Airport';
import AirportInfoCard from './AirportInfoCard';

interface AirportInfoProps {
  airport: Airport|null;
}

function AirportInfo(props:AirportInfoProps) {
  const { airport } = props;
  const Item = styled(Paper)(({ theme }) => ({
         backgroundColor: '#fff',
         padding: theme.spacing(1),
         ...theme.applyStyles('dark', {
           backgroundColor: '#1A2027',
         }),
      }));

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
                <AirportInfoCard title="IATA Code" value={airport.iataCode}/>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <AirportInfoCard title="City IATA Code" value={airport.cityIataCode}/>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <AirportInfoCard title="Longitude" value={airport.longitude}/>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <AirportInfoCard title="Latitude" value={airport.latitude}/>
              </Grid>
          </Grid>
        </Box>
      )
  } else {
    return (<><p>No Data</p></>);
  }
}

export default AirportInfo
