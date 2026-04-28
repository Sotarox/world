import { Card } from '@/components/shadcn/card';
import { CountryShape } from '@/components/world/country-shape';
import InfoCard from '@/components/world/info-card';
import type { ACCountry, ACCountryNav } from '@/model/ac-country';
import {
  concatStringsWithComma,
  formatCoordinate,
  formatNumberWithComma,
} from '@/utils/utils';
import 'flag-icons/css/flag-icons.min.css';
import { AdjacentNavigation } from './adjacent-navigation';
import CountryInfoHeader from './country-info-header';

interface CountryInfoProps {
  iso2: string;
  acCountry: ACCountry;
  previousNav: ACCountryNav | undefined;
  nextNav: ACCountryNav | undefined;
}
function CountryInfo(props: CountryInfoProps) {
  const { iso2, acCountry, previousNav, nextNav } = props;

  return (
    <Card className='p-4 gap-3'>
      <CountryInfoHeader country={acCountry} />
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
        <InfoCard title='Capital' value={acCountry.capital} />
        <InfoCard title='Country ISO2' value={acCountry.alpha2Code} />
        <InfoCard title='Country ISO3' value={acCountry.alpha3Code} />
        <InfoCard
          title='Top domain'
          value={concatStringsWithComma(acCountry?.topLevelDomain)}
        />
        <InfoCard title='Phone prefix' value={acCountry.callingCodes[0]} />
        <InfoCard
          title='Currency'
          value={acCountry.currencies[0]?.name ?? 'N/A'}
        />
        <InfoCard
          title='Area'
          value={
            acCountry?.area
              ? `${formatNumberWithComma(acCountry.area)} \u33A2`
              : 'N/A'
          }
        />
        <InfoCard
          title='Language'
          value={concatStringsWithComma(
            acCountry?.languages?.map((lang) => lang.name)
          )}
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
