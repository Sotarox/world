import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import api from '../api/axios';
import {type Country} from '../model/Country';
import AirportList from './AirportList';
import PublicIcon from '@mui/icons-material/Public';
import Box from '@mui/material/Box';
import { Item } from '../components/Item';

function Country() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [sizeAirports, setSizeAirports] = useState(0);

  useEffect(() => {
    api.get<Country[]>("countries")
        .then((res) => {
            setCountries(res.data);
        })
        .catch((error) => console.log(error));
  }, []);

  if (countries.length > 0) {
    const country = countries[1];
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
          <AirportList countryIso2={country.countryIso2} onLoad={(size:number)=>setSizeAirports(size)}/>
        </>
      )
  } else {
    return <p>Country couldn't be loaded.</p>
  }
}

export default Country
