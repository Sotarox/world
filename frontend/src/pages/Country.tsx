import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import api from '../api/axios';
import {type Country} from '../model/Country';
import AirportList from './AirportList'

function Country() {
  const [countries, setCountries] = useState<Country[]>([]);

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
          <Typography variant="h2">{country.country_name}</Typography>
          {country.country_name && (
            <AirportList countryIso2={country.country_iso2}/>
          )}
        </>
      )
  } else {
    return <p>Country couldn't be loaded.</p>
  }
}

export default Country
