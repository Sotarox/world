import { useState, useEffect } from 'react';
import api from '../api/axios';
import {type Country} from '../model/Country';
import AirportList from './AirportList';
import CountryInfo from './CountryInfo';

interface CountryLoadProps {
  selectedCountry: string;
}
function CountryLoad(props: CountryLoadProps) {
  const {selectedCountry} = props;
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
    const country: Country|undefined = countries.find((c) => c.countryIso2 === selectedCountry);
    
    if (typeof country !== "undefined") { 
      return (
        <>
          <CountryInfo country={country} sizeAirports={sizeAirports}/>
          <AirportList countryIso2={country.countryIso2} onLoad={(size:number)=>setSizeAirports(size)}/>
        </>
      )
    } else return <>country is undefined</>
  } else {
    return <p>Country couldn't be loaded.</p>
  }
}

export default CountryLoad;
