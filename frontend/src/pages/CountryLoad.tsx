import { useState, useEffect } from 'react';
import api from '../api/axios';
import {type Country} from '../model/Country';
import AirportList from './AirportList';
import CountryInfo from './CountryInfo';

function CountryLoad() {
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
          <CountryInfo country={country} sizeAirports={sizeAirports}/>
          <AirportList countryIso2={country.countryIso2} onLoad={(size:number)=>setSizeAirports(size)}/>
        </>
      )
  } else {
    return <p>Country couldn't be loaded.</p>
  }
}

export default CountryLoad;
