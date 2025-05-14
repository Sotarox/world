import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {type Airport} from '../model/Airport';

interface AirportInfoProps {
  airport: Airport|null;
}

function AirportInfo(props:AirportInfoProps) {
  const { airport } = props;
  const Item = styled(Paper)(({ theme }) => ({
       backgroundColor: '#fff',
       ...theme.typography.body2,
       padding: theme.spacing(1),
       textAlign: 'center',
       ...theme.applyStyles('dark', {
         backgroundColor: '#1A2027',
       }),
    }));

  return (
    <>
      <p>airport ID: {airport ? airport.id : "N/A"}</p>
      <p>airport name: {airport ? airport.airportName : "N/A"}</p>
      <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Paper>12</Paper>
          </Grid>
          <Grid size={{ xs: 6, md: 8 }}>
            <Item>xs=6 md=8</Item>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Item>xs=6 md=4</Item>
          </Grid>
      </Grid>
    </>
  )
}

export default AirportInfo
