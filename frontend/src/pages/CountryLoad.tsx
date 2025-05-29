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
  const [country, setCountry] = useState<Country | undefined>();
  const [sizeAirports, setSizeAirports] = useState(0);

  useEffect(() => {
    if (selectedCountry) {
      api.get<Country>(`countries/${selectedCountry}`)
        .then((res) => {
            setCountry(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedCountry]);

  if (country) {
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
