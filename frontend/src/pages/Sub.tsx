import { useState, useEffect } from 'react';
import api from '../api/axios';
import {type Country} from '../model/Country';
import AirportList from './AirportList'

function Sub() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    api.get<Country[]>("countries")
        .then((res) => {
            setCountries(res.data);
        })
        .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Country ID: {countries[1]?.id ?? "N/A"}</h1>
      <h1>Country name: {countries[1]?.country_name ?? "N/A"}</h1>
      {countries[1]?.country_name && (
        <AirportList countryIso2={countries[1]?.country_iso2}/>
      )}
    </>
  )
}

export default Sub
