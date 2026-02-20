import React, { useContext } from 'react';
import { type Country } from '../model/Country';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import {
  convertContinentCodeToName,
  formatCoordinate,
  formatNumberWithComma,
} from '../utils/utils';
import { CurrentTopicContext } from '../contexts/CurrentTopicContext';
import InfoCardClickable from '../units/InfoCardClickable';
import type { ACCountry } from '../model/ACCountry';
import CountryInfoHeader from './CountryInfoHeader';
import InfoCard from '../units/InfoCard';
import { Card } from '@/components/ui/card';

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
      <Card className='p-4'>
        <CountryInfoHeader country={country} />
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
          <InfoCard
            title='Continent'
            value={convertContinentCodeToName(country.continent)}
          />
          <InfoCard
            title='Region'
            value={acCountry?.region.toString() ?? 'N/A'}
          />
          <InfoCard
            title='Subregion'
            value={acCountry?.subregion.toString() ?? 'N/A'}
          />
          <InfoCard
            title='Coordinate'
            value={acCountry ? formatCoordinate(acCountry.latlng) : 'N/A'}
          />
          <InfoCard title='Capital' value={country.capital} />
          <InfoCard title='Country ISO2' value={country.countryIso2} />
          <InfoCard title='Country ISO3' value={country.countryIso3} />
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
      </Card>

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 items-start'>
        <InfoCardClickable
          title='Population'
          value={
            country.population
              ? formatNumberWithComma(country.population)
              : 'N/A'
          }
          isSelected={currentTopic === 'population'}
          onClick={() => setCurrentTopic('population')}
        />
        <InfoCardClickable
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
