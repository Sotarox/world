import React, { useContext } from 'react';
import { type Country } from '../model/Country';
import { Item } from '../components/Item';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import {
  convertContinentCodeToName,
  formatCoordinate,
  formatNumberWithComma,
} from '../utils/utils';
import { CurrentTopicContext } from '../contexts/CurrentTopicContext';
import ClickbarInfoCard from '../components/ClickbarInfoCard';
import type { ACCountry } from '../model/ACCountry';
import CountryInfoHeader from './CountryInfoHeader';
import InfoCard from '../components/InfoCard';

interface CountryInfoProps {
  acCountry: ACCountry | null;
  country: Country;
  sizeAirports: number;
}
function CountryInfo(props: CountryInfoProps) {
  const { acCountry, country, sizeAirports } = props;
  const { currentTopic, setCurrentTopic } = useContext(CurrentTopicContext);

  return (
    <>
      <Item sx={{ mb: 1 }}>
        <CountryInfoHeader country={country} />
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
          <InfoCard
            title='Coordinate'
            value={acCountry ? formatCoordinate(acCountry.latlng) : 'N/A'}
          />
          <InfoCard title='Country ISO3' value={country.countryIso3} />
          <InfoCard
            title='Continent'
            value={convertContinentCodeToName(country.continent)}
          />
          <InfoCard
            title='Subregion'
            value={acCountry?.subregion.toString() ?? 'N/A'}
          />
          <InfoCard title='Capital' value={country.capital} />
          <InfoCard title='Country ISO2' value={country.countryIso2} />
          <InfoCard title='Currency' value={country.currencyName} />
          <InfoCard title='Phone prefix' value={country.phonePrefix} />
          <InfoCard
            title='Area'
            value={
              acCountry?.area
                ? `${formatNumberWithComma(acCountry.area)} \u33A2`
                : 'N/A'
            }
          />
        </div>
      </Item>

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
        <ClickbarInfoCard
          title='Population'
          value={
            country.population
              ? formatNumberWithComma(country.population)
              : 'N/A'
          }
          isSelected={currentTopic === 'population'}
          onClick={() => setCurrentTopic('population')}
        />
        <ClickbarInfoCard
          title='The number of airports'
          value={sizeAirports.toString()}
          isSelected={currentTopic === 'airports'}
          onClick={() => setCurrentTopic('airports')}
        />
      </div>
    </>
  );
}

export default CountryInfo;
