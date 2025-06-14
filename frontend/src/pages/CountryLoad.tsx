import { useCallback, useContext, useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import api from '../api/axios';
import { type Country } from '../model/Country';
import AirportList from './AirportList';
import CountryInfo from './CountryInfo';
import PopulationInfo from './PopulationInfo';
import { CurrentIso2Context, SetCurrentIso2Context } from '../contexts/CurrentIso2Context';
import { CurrentTopicContext } from '../contexts/CurrentTopicContext';
import { Box, Divider } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { countryIso2ToName, previousCountryIso2, nextCountryIso2 } from '../model/CountryIso2NameMap';
import { CircleFlag } from 'react-circle-flags';
import "/node_modules/flag-icons/css/flag-icons.min.css";

function CountryLoad() {
  const [country, setCountry] = useState<Country | undefined>();
  const [sizeAirports, setSizeAirports] = useState(0);
  const { currentIso2 } = useContext(CurrentIso2Context);
  const { setCurrentIso2 } = useContext(SetCurrentIso2Context);
  const { currentTopic } = useContext(CurrentTopicContext);
  const onLoadAirpots = useCallback((size:number) => {setSizeAirports(size)}, []);

  useEffect(() => {
    if (currentIso2 !== "") {
      api.get<Country>(`countries/${currentIso2}`)
        .then((res) => {
          setCountry(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [currentIso2]);

  if (country) {
    return (
      <>
        <CountryInfo country={country} sizeAirports={sizeAirports} />
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <IconButton onClick={() => setCurrentIso2(previousCountryIso2(currentIso2))}>
            <CircleFlag countryCode={previousCountryIso2(currentIso2).toLowerCase()} height="20"
              title={countryIso2ToName(previousCountryIso2(currentIso2))} />
            <ArrowLeft />
          </IconButton>
          <IconButton onClick={() => setCurrentIso2(nextCountryIso2(currentIso2))}>
            <ArrowRight />
            <CircleFlag countryCode={nextCountryIso2(currentIso2).toLowerCase()} height="20"
              title={countryIso2ToName(nextCountryIso2(currentIso2))} />
          </IconButton>
        </Box>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <AirportList countryIso2={country.countryIso2} isVisible={currentTopic === "airports"}
          onLoad={onLoadAirpots} />
        <PopulationInfo countryIso2={currentIso2} continentCode={country.continent}
          isVisible={currentTopic === "population"} />
      </>
    )
  } else {
    return <p>Country couldn't be loaded.</p>
  }
}

export default CountryLoad;
