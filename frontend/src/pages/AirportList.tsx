import { useState, useEffect } from 'react';
import api from '../api/axios';
import {type Airport} from '../model/Airport';
import AirportInfo from './AirportInfo'

interface AirportListProps {
  countryIso2: string|null;
}

function AirportList(props:AirportListProps) {
  const { countryIso2 } = props;
  const [airports, setAirports] = useState<Airport[]>([]);

  useEffect(() => {
    api.get<Airport[]>("airports/" + countryIso2)
        .then((res) => {
            setAirports(res.data);
        })
        .catch((error) => console.log(error));
  }, [countryIso2]);

  return (
    <>
      <h2>Airports</h2>
      <h3>countryIso2: {countryIso2 ? countryIso2 : "N/A"}</h3>
      {
        airports.length > 0 ?
          airports.map((airport) => (
            <AirportInfo airport={airport}/>
          ))
        : (<></>)
      }
    </>
  )
}

export default AirportList;
