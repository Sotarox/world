import { useContext, useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import api from '../api/axios';
import { type Country } from '../model/Country';
import AirportList from './AirportList';
import CountryInfo from './CountryInfo';
import { CurrentIso2Context } from '../contexts/CurrentIso2Context';
import { CurrentTopicContext } from '../contexts/CurrentTopicContext';

function CountryLoad() {
  const [country, setCountry] = useState<Country | undefined>();
  const [sizeAirports, setSizeAirports] = useState(0);
  const { currentIso2 } = useContext(CurrentIso2Context);
  const { currentTopic } = useContext(CurrentTopicContext);

  useEffect(() => {
    if (currentIso2 !== "N/A") {
      api.get<Country>(`countries/${currentIso2}`)
        .then((res) => {
          setCountry(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [currentIso2]);

  if (country) {
    const topic = currentTopic === "airports" ? <AirportList countryIso2={country.countryIso2} onLoad={(size: number) => setSizeAirports(size)} />
      : <></>;
    return (
      <>
        <CountryInfo country={country} sizeAirports={sizeAirports} />
        <Divider sx={{ mt: 2, mb: 2 }} />
        {topic}
      </>
    )
  } else {
    return <p>Country couldn't be loaded.</p>
  }
}

export default CountryLoad;
