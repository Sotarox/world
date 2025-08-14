import { useContext } from 'react';
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
import useApi from '../api/useApi';

function CountryLoad() {
  const { currentTopic } = useContext(CurrentTopicContext);
  const currentIso2 = useParams().iso2?.toUpperCase() ?? '';
  const country: Country | null = useApi<Country>(`/countries/${currentIso2}`);
  const acCountry: ACCountry | null = useApi<ACCountry>(
    `/accountries/${currentIso2}`
  );
  const navigate = useNavigate();

  if (country) {
    return (
      <Box sx={{ pb: { xs: 8, sm: 0 } }}>
        <CountryInfo
          acCountry={acCountry}
          country={country}
          sizeAirports={country.totalNumberOfAirports}
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
        />
        {currentTopic === 'population' && (
          <PopulationInfo
            countryIso2={currentIso2}
            continentCode={country.continent}
          />
        )}
      </Box>
    );
  } else {
    return <></>;
  }
}

export default CountryLoad;
