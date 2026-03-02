import React from 'react';
import { type Country } from '@/model/country';
import 'flag-icons/css/flag-icons.min.css';
import {
  convertContinentCodeToName,
  formatCoordinate,
  formatNumberWithComma,
  concatStringsWithComma,
} from '@/utils/utils';
import InfoCardClickable from '@/components/world/info-card-clickable';
import type { ACCountry } from '@/model/ac-country';
import CountryInfoHeader from './country-info-header';
import InfoCard from '@/components/world/info-card';
import { Card } from '@/components/shadcn/card';
import { useTopicStore } from '@/store/topic-store';
import { CountryShape } from '@/components/world/country-shape';

interface CountryInfoProps {
  acCountry: ACCountry | null;
  country: Country;
  sizeAirports: number;
}
function CountryInfo(props: CountryInfoProps) {
  const { acCountry, country, sizeAirports } = props;
  const { currentTopic, toggleCurrentTopic } = useTopicStore();

  return (
    <>
      <Card className='p-4 gap-3'>
        <CountryInfoHeader country={country} />
        <CountryShape
          iso2={country.countryIso2.toLowerCase()}
          width={200}
          height={200}
          className='self-center'
        />
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
          <InfoCard
            title='Top domain'
            value={concatStringsWithComma(acCountry?.topLevelDomain)}
          />
          <InfoCard
            title='Time zone'
            value={concatStringsWithComma(acCountry?.timezones)}
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
          onClick={() => toggleCurrentTopic('population')}
        />
        <InfoCardClickable
          title='Airports'
          value={sizeAirports.toString()}
          isSelected={currentTopic === 'airports'}
          onClick={() => toggleCurrentTopic('airports')}
        />
      </div>
    </>
  );
}

export { CountryInfo };
