import { Card } from '@/components/shadcn/card';
import { CountryShape } from '@/components/world/country-shape';
import InfoCard from '@/components/world/info-card';
import type { ACCountry, ACCountryNav } from '@/model/ac-country';
import { type Country } from '@/model/country';
import {
  concatStringsWithComma,
  convertContinentCodeToName,
  formatCoordinate,
  formatNumberWithComma,
} from '@/utils/utils';
import 'flag-icons/css/flag-icons.min.css';
import { AdjacentNavigation } from './adjacent-navigation';
import CountryInfoHeader from './country-info-header';

interface CountryInfoProps {
  iso2: string;
  acCountry: ACCountry | null;
  country: Country;
  previousNav: ACCountryNav | undefined;
  nextNav: ACCountryNav | undefined;
}
function CountryInfo(props: CountryInfoProps) {
  const { iso2, acCountry, country, previousNav, nextNav } = props;

  return (
    <Card className='p-4 gap-3'>
      <CountryInfoHeader country={country} />
      <div className='flex justify-between items-center gap-4'>
        <AdjacentNavigation order='previous' nav={previousNav} />
        <CountryShape
          iso2={iso2}
          width={200}
          height={200}
          className='self-center'
        />
        <AdjacentNavigation order='next' nav={nextNav} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 [&>*]:min-w-0'>
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
  );
}

export { CountryInfo };
