import React, { useContext } from 'react';
import { type Country } from '../model/Country';
import AirportList from './AirportList';
import CountryInfo from './CountryInfo';
import PopulationInfo from './PopulationInfo';
import { CurrentTopicContext } from '../contexts/CurrentTopicContext';
import { IconButton } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import {
  previousCountryNav,
  nextCountryNav,
} from '../model/CountryIso2NameMap';
import { CircleFlag } from 'react-circle-flags';
import 'flag-icons/css/flag-icons.min.css';
import { type ACCountry } from '../model/ACCountry';
import { useNavigate, useParams } from 'react-router';
import useApi from '../api/useApi';
import { useCountryNav } from '@/store/CountryNavStore';
import { PopulationChart } from '@/units/PopulationChart';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

function CountryLoad() {
  const { currentTopic } = useContext(CurrentTopicContext);
  const currentIso2 = useParams().iso2?.toUpperCase() ?? '';
  const country: Country | null = useApi<Country>(`/countries/${currentIso2}`);
  const acCountry: ACCountry | null = useApi<ACCountry>(
    `/accountries/${currentIso2}`
  );
  const navigate = useNavigate();
  const countryNavs = useCountryNav((s) => s.countries);
  const countryNavsSortedByPopulation = React.useMemo(
    () =>
      [...countryNavs].sort(
        (a, b) => (b.population ?? 0) - (a.population ?? 0)
      ),
    [countryNavs]
  );
  const previousNav = previousCountryNav(currentIso2, countryNavs);
  const nextNav = nextCountryNav(currentIso2, countryNavs);

  if (country) {
    return (
      <div className='pb-2 sm:pb-0 flex flex-col gap-3'>
        <CountryInfo
          acCountry={acCountry}
          country={country}
          sizeAirports={country.totalNumberOfAirports}
        />
        <div className='flex w-full justify-center'>
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
        </div>
        <Separator />
        <AirportList
          countryIso2={country.countryIso2}
          isVisible={currentTopic === 'airports'}
        />
        {currentTopic === 'population' && (
          <Card className='p-4'>
            <PopulationInfo
              countryIso2={currentIso2}
              continentCode={country.continent}
            />
            <PopulationChart
              data={countryNavsSortedByPopulation}
              selectedIso2={currentIso2}
            />
          </Card>
        )}
      </div>
    );
  } else {
    return <></>;
  }
}

export default CountryLoad;
