import { useState, useEffect } from 'react';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import api from '../api/axios';
import {type Airport} from '../model/Airport';

function Airports() {
  const [airports, setCountries] = useState<Airport[]>([]);

  useEffect(() => {
    api.get<Airport[]>("airports")
        .then((res) => {
            setCountries(res.data);
        })
        .catch((error) => console.log(error));
  }, []);

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
      {countries[0]?.country_name && (
        <h2>{countries[0].country_name}</h2>
      )}
      <h1>ID: {countries[0]?.id ?? "N/A"}</h1>
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

    </>
  )
}

export default Airports
