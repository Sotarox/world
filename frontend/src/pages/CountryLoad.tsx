import React, { useContext } from 'react';
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
import { useCountryNav } from '@/store/CountryNavStore';

function CountryLoad() {
  const { currentTopic } = useContext(CurrentTopicContext);
  const currentIso2 = useParams().iso2?.toUpperCase() ?? '';
  const country: Country | null = useApi<Country>(`/countries/${currentIso2}`);
  const acCountry: ACCountry | null = useApi<ACCountry>(
    `/accountries/${currentIso2}`
  );
  const navigate = useNavigate();
  const countryNavs = useCountryNav((s) => s.countries);
  const prevIso2 = previousCountryIso2(currentIso2, countryNavs)?.toLowerCase();
  const nextIso2 = nextCountryIso2(currentIso2, countryNavs)?.toLowerCase();

  if (country) {
    return (
      <Box sx={{ pb: { xs: 8, sm: 0 } }}>
        <CountryInfo
          acCountry={acCountry}
          country={country}
          sizeAirports={country.totalNumberOfAirports}
        />
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          {prevIso2 && (
            <IconButton onClick={() => navigate(`/countries/${prevIso2}`)}>
              <CircleFlag
                countryCode={prevIso2 || ''}
                height='20'
                width='20'
                title={countryIso2ToName(prevIso2 || '')}
              />
              <ArrowLeft />
            </IconButton>
          )}
          {nextIso2 && (
            <IconButton onClick={() => navigate(`/countries/${nextIso2}`)}>
              <ArrowRight />
              <CircleFlag
                countryCode={nextIso2 || ''}
                height='20'
                width='20'
                title={countryIso2ToName(nextIso2 || '')}
              />
            </IconButton>
          )}
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
