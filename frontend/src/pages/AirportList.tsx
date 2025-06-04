import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import api from '../api/axios';
import {type Airport} from '../model/Airport';
import AirportInfo from './AirportInfo'

interface AirportListProps {
  countryIso2: string|null;
  onLoad: (size:number) => void;
  isVisible: boolean;
}

function AirportList(props:AirportListProps) {
  const { countryIso2, isVisible, onLoad } = props;
  const [airports, setAirports] = useState<Airport[]>([]);

  useEffect(() => {
    api.get<Airport[]>("airports/" + countryIso2)
        .then((res) => {
            setAirports(res.data);
            console.log(res.data);
            onLoad(res.data.length);
        })
        .catch((error) => console.log(error));
  }, [countryIso2, onLoad]);

  if (isVisible && airports.length > 0) {
    return (
      <Box sx={{mt:4}}>
        {
          airports.map((airport) => (
            <AirportInfo key={airport.dbId} airport={airport}/>
          ))
        }
      </Box>
    )
  } else return <></>;
}

export default AirportList;
