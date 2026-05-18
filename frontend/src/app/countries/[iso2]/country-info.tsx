import { useApi } from '@/api/use-api';
import { Card } from '@/components/world/card';
import { CountryShape } from '@/components/world/country-shape';
import InfoCard from '@/components/world/info-card';
import type { ACCountry } from '@/model/ac-country';
import {
  nextCountryNav,
  previousCountryNav,
} from '@/model/country-iso2-name-map';
import { useCountryNav } from '@/store/country-nav-store';
import { concatStringsWithComma, formatCoordinate } from '@/utils/utils';
import 'flag-icons/css/flag-icons.min.css';
import { AdjacentNavigation } from './adjacent-navigation';
import CountryInfoHeader from './country-info-header';

interface CountryInfoProps {
  iso2: string;
}
function CountryInfo(props: CountryInfoProps) {
  const { iso2 } = props;
  const { data: acCountry, error } = useApi<ACCountry>(`/accountries/${iso2}`);

  const countryNavs = useCountryNav((s) => s.countries);
  const previousNav = previousCountryNav(iso2.toUpperCase(), countryNavs);
  const nextNav = nextCountryNav(iso2.toUpperCase(), countryNavs);

  return (
    <Card className='p-4 gap-3'>
      {error && (
        <span className='pl-2' data-testid='country-info-error'>
          Error loading country data
        </span>
      )}
      <>
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
          <InfoCard title='Capital' value={acCountry?.capital ?? 'N/A'} />
          <InfoCard
            title='Country ISO2'
            value={acCountry?.alpha2Code ?? 'N/A'}
          />
          <InfoCard
            title='Country ISO3'
            value={acCountry?.alpha3Code ?? 'N/A'}
          />
          <InfoCard
            title='Top domain'
            value={concatStringsWithComma(acCountry?.topLevelDomain)}
          />
          <InfoCard
            title='Phone prefix'
            value={acCountry?.callingCodes[0] ?? 'N/A'}
          />
          <InfoCard
            title='Currency'
            value={acCountry?.currencies ? acCountry.currencies[0].name : 'N/A'}
          />
          <InfoCard
            title='Independent'
            value={acCountry?.independent ? 'Yes' : 'No'}
          />
          <InfoCard
            title='Language'
            value={concatStringsWithComma(
              acCountry?.languages?.map((lang) => lang.name) ?? ['N/A']
            )}
          />
          <InfoCard
            title='Time zone'
            value={concatStringsWithComma(acCountry?.timezones ?? ['N/A'])}
          />
        </div>
      </>
    </Card>
  );
}

CountryInfo.displayName = 'CountryInfo';
export { CountryInfo };
