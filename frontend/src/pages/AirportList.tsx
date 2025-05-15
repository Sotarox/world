import { useState, useEffect } from 'react';
import api from '../api/axios';
import {type Airport} from '../model/Airport';
import AirportInfo from './AirportInfo'

interface AirportListProps {
  countryIso2: string|null;
  onLoad: (size:number) => void;
}

function AirportList(props:AirportListProps) {
  const { countryIso2, onLoad } = props;
  const [airports, setAirports] = useState<Airport[]>([]);

  useEffect(() => {
    api.get<Airport[]>("airports/" + countryIso2)
        .then((res) => {
            setAirports(res.data);
            console.log(res.data);
            onLoad(res.data.length);
        })
        .catch((error) => console.log(error));
  }, [countryIso2]);

  return (
    <>
      <h2>The number of airports: {airports.length}</h2>
      {
        airports.length > 0 ?
          airports.map((airport) => (
            <AirportInfo key={airport.dbid} airport={airport}/>
          ))
        : (<></>)
      }
    </>
  )
}

export default AirportList;
