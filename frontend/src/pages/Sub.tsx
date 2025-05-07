import countries from "../data/Countries"
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

function Sub() {
  const country = countries[0];
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
      <h1>{country.country_name}</h1>
      
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
        <Grid size={{ xs: 6, md: 4 }}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid size={{ xs: 6, md: 8 }}>
          <Item>xs=6 md=8</Item>
        </Grid>
      </Grid>

      <Button variant="contained">Hello world</Button>
    </>
  )
}

export default Sub
