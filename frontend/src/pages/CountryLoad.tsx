import React, { useContext } from 'react';
import { type Country } from '../model/Country';
import AirportList from './AirportList';
import CountryInfo from './CountryInfo';
import PopulationInfo from './PopulationInfo';
import { CurrentTopicContext } from '../contexts/CurrentTopicContext';
import { Box, Divider, IconButton } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import {
  previousCountryNav,
  nextCountryNav,
} from '../model/CountryIso2NameMap';
import { CircleFlag } from 'react-circle-flags';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { type ACCountry } from '../model/ACCountry';
import { useNavigate, useParams } from 'react-router';
import useApi from '../api/useApi';
import { useCountryNav } from '@/store/CountryNavStore';
import { PopulationChart } from '@/units/PopulationChart';

function CountryLoad() {
  const { currentTopic } = useContext(CurrentTopicContext);
  const currentIso2 = useParams().iso2?.toUpperCase() ?? '';
  const country: Country | null = useApi<Country>(`/countries/${currentIso2}`);
  const acCountry: ACCountry | null = useApi<ACCountry>(
    `/accountries/${currentIso2}`
  );
  const navigate = useNavigate();
  const countryNavsRaw = useCountryNav((s) => s.countries);
  const countryNavs = React.useMemo(
    () =>
      [...countryNavsRaw].sort(
        (a, b) => (b.population ?? 0) - (a.population ?? 0)
      ),
    [countryNavsRaw]
  );
  const previousNav = previousCountryNav(currentIso2, countryNavs);
  const nextNav = nextCountryNav(currentIso2, countryNavs);

  if (country) {
    return (
      <Box sx={{ pb: { xs: 8, sm: 0 } }}>
        <CountryInfo
          acCountry={acCountry}
          country={country}
          sizeAirports={country.totalNumberOfAirports}
        />
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          {previousNav && (
            <IconButton
              onClick={() =>
                navigate(`/countries/${previousNav.alpha2Code.toLowerCase()}`)
              }
            >
              <CircleFlag
                countryCode={previousNav.alpha2Code.toLowerCase() || ''}
                height='20'
                width='20'
                title={previousNav.name || ''}
              />
              <ArrowLeft />
            </IconButton>
          )}
          {nextNav && (
            <IconButton
              onClick={() =>
                navigate(`/countries/${nextNav.alpha2Code.toLowerCase()}`)
              }
            >
              <ArrowRight />
              <CircleFlag
                countryCode={nextNav.alpha2Code.toLowerCase() || ''}
                height='20'
                width='20'
                title={nextNav.name || ''}
              />
            </IconButton>
          )}
        </Box>
        <Divider sx={{ mt: 2, mb: 2 }} />
        {countryNavs?.length > 0 && (
          <PopulationChart data={countryNavs} selectedIso2={currentIso2} />
        )}
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
