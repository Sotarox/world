import { useCallback, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { type Country } from '../model/Country';
import AirportList from './AirportList';
import CountryInfo from './CountryInfo';
import PopulationInfo from './PopulationInfo';
import { CurrentTopicContext } from '../contexts/CurrentTopicContext';
import { Box, Divider, IconButton } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import {
  countryIso2ToName,
  previousCountryIso2,
  nextCountryIso2,
} from '../model/CountryIso2NameMap';
import { CircleFlag } from 'react-circle-flags';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { type ACCountry } from '../model/ACCountry';
import { useNavigate, useParams } from 'react-router';

function CountryLoad() {
  const [country, setCountry] = useState<Country | undefined>();
  const [acCountry, setAcCountry] = useState<ACCountry | undefined>();
  const [sizeAirports, setSizeAirports] = useState(0);
  const { currentTopic } = useContext(CurrentTopicContext);
  const onLoadAirpots = useCallback((size: number) => {
    setSizeAirports(size);
  }, []);
  const currentIso2 = useParams().iso2?.toUpperCase() ?? '';
  const navigate = useNavigate();

  useEffect(() => {
    if (currentIso2 !== '') {
      api
        .get<Country>(`countries/${currentIso2}`)
        .then((res) => {
          setCountry(res.data);
        })
        .catch((error) => console.log(error));
      api
        .get<ACCountry>(`accountries/${currentIso2}`)
        .then((res) => {
          setAcCountry(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [currentIso2]);

  if (country) {
    return (
      <Box sx={{ pl: 2, pr: 2, pb: { xs: 8, sm: 0 } }}>
        <CountryInfo
          acCountry={acCountry}
          country={country}
          sizeAirports={sizeAirports}
        />
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <IconButton
            onClick={() =>
              navigate(
                `/countries/${previousCountryIso2(currentIso2).toLowerCase()}`
              )
            }
          >
            <CircleFlag
              countryCode={previousCountryIso2(currentIso2).toLowerCase()}
              height='20'
              title={countryIso2ToName(previousCountryIso2(currentIso2))}
            />
            <ArrowLeft />
          </IconButton>
          <IconButton
            onClick={() =>
              navigate(
                `/countries/${nextCountryIso2(currentIso2).toLowerCase()}`
              )
            }
          >
            <ArrowRight />
            <CircleFlag
              countryCode={nextCountryIso2(currentIso2).toLowerCase()}
              height='20'
              title={countryIso2ToName(nextCountryIso2(currentIso2))}
            />
          </IconButton>
        </Box>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <AirportList
          countryIso2={country.countryIso2}
          isVisible={currentTopic === 'airports'}
          onLoad={onLoadAirpots}
        />
        <PopulationInfo
          countryIso2={currentIso2}
          continentCode={country.continent}
          isVisible={currentTopic === 'population'}
        />
      </Box>
    );
  } else {
    return <></>;
  }
}

export default CountryLoad;
