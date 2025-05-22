import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import {type Country} from '../model/Country';
import PublicIcon from '@mui/icons-material/Public';
import Box from '@mui/material/Box';
import { Item } from '../components/Item';
import InfoCard from '../components/InfoCard';

interface CountryInfoProps {
  country: Country;
  sizeAirports: number;
}
function CountryInfo(props: CountryInfoProps) {
  const { country, sizeAirports } = props;

    return (
        <Box sx={{mt:2}}>
          <Item sx={{ mb:2 }}>
            <Box sx={{ display:"flex" }}>
              <PublicIcon sx={{ fontSize: 60 }}/>
              <Typography variant="h2">{country.countryName}</Typography>
            </Box>
          </Item>
          <Grid container spacing={1}>
            <Grid size={{ xs: 6, md: 3 }}>
              <InfoCard title="Capital" value={country.capital}/>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <InfoCard title="Continent" value={country.continent}/>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <InfoCard title="Country ISO2" value={country.countryIso2}/>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <InfoCard title="Country ISO3" value={country.countryIso3}/>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <InfoCard title="Currency" value={country.currencyName}/>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <InfoCard title="Population" value={country.population}/>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <InfoCard title="Phone prefix" value={country.phonePrefix}/>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <InfoCard title="The number of airports" value={sizeAirports}/>
            </Grid>
          </Grid>
        </Box>
    )
}

export default CountryInfo;
