import { useState, useEffect } from 'react';
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';
import api from '../api/axios';
import {type Country} from '../model/Country';

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
      {countries[0]?.country_name && (
        <h2>{countries[0].country_name}</h2>
      )}
      <h1>ID: {countries[0]?.id ?? "N/A"}</h1>
    </>
  )
}

export default Sub
