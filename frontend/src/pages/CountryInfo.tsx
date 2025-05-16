import Typography from '@mui/material/Typography';
import {type Country} from '../model/Country';
import PublicIcon from '@mui/icons-material/Public';
import Box from '@mui/material/Box';
import { Item } from '../components/Item';

interface CountryInfoProps {
  country: Country;
  sizeAirports: number;
}
function CountryInfo(props: CountryInfoProps) {
  const { country, sizeAirports } = props;

    return (
        <>
          <Item>
            <Box sx={{ display:"flex" }}>
              <PublicIcon sx={{ fontSize: 60 }}/>
              <Typography variant="h2">{country.countryName}</Typography>
            </Box>
            <Typography variant="h5">Capital: {country.capital}</Typography>
            <Typography variant="h5">Continent: {country.continent}</Typography>
            <Typography variant="h5">Country ISO2: {country.countryIso2}</Typography>
            <Typography variant="h5">Country ISO3: {country.countryIso3}</Typography>
            <Typography variant="h5">Currency: {country.currencyName}</Typography>
            <Typography variant="h5">Currency Code: {country.currencyCode}</Typography>
            <Typography variant="h5">Population: {country.population}</Typography>
            <Typography variant="h5">The number of airports: {sizeAirports}</Typography>
          </Item>
        </>
    )
}

export default CountryInfo;
