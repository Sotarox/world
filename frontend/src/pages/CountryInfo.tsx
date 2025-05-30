import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import {type Country} from '../model/Country';
import Box from '@mui/material/Box';
import { Item } from '../components/Item';
import InfoCard from '../components/InfoCard';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { continentCodeToName } from '../utils/utils';

interface CountryInfoProps {
  country: Country;
  sizeAirports: number;
}
function CountryInfo(props: CountryInfoProps) {
  const { country, sizeAirports } = props;
  const smallIso2 = `fi fi-${country.countryIso2.toLowerCase()}`;

    return (
        <Box sx={{mt:2}}>
          <Item sx={{ mb:2, display:"flex", justifyContent:"center", alignItems: "center", gap: 1.5 }}>
            <span className={smallIso2} style={{height:"72px", width: "72px", flexShrink: "0"}}></span>
            <Typography variant="h2" sx={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>{country.countryName}</Typography>
          </Item>
          <Grid container spacing={1}>
            <Grid size={{ xs: 6, md: 3 }}>
              <InfoCard title="Capital" value={country.capital}/>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <InfoCard title="Continent" value={continentCodeToName(country.continent)}/>
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
              <InfoCard title="The number of airports" value={sizeAirports.toString()}/>
            </Grid>
          </Grid>
        </Box>
    )
}

export default CountryInfo;
