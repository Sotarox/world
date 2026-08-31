import api from '@/api/axios';
import { Card } from '@/components/world/card';
import { CountryShape } from '@/components/world/country-shape';
import type { ACCountry } from '@/model/ac-country';
import {
  nextCountryNav,
  previousCountryNav,
} from '@/model/country-iso2-name-map';
import { useCountryNav } from '@/store/country-nav-store';
import { useQuery } from '@tanstack/react-query';
import 'flag-icons/css/flag-icons.min.css';
import { AdjacentNavigation } from './adjacent-navigation';
import CountryInfoHeader from './country-info-header';
import { CountryInfoGrid } from './country-info-grid';

interface CountryInfoProps {
  iso2: string;
}
function CountryInfo(props: CountryInfoProps) {
  const { iso2 } = props;
  const {
    isPending,
    isError,
    data: acCountry,
    error,
  } = useQuery({
    queryKey: ['accountries', iso2],
    queryFn: () =>
      api.get<ACCountry>(`/accountries/${iso2}`).then((res) => res.data),
  });

  const countryNavs = useCountryNav((s) => s.countries);
  const previousNav = previousCountryNav(iso2.toUpperCase(), countryNavs);
  const nextNav = nextCountryNav(iso2.toUpperCase(), countryNavs);

  return (
    <Card className='p-4 gap-3'>
      {isPending ? (
        <span className='pl-2'>Loading...</span>
      ) : isError ? (
        <span className='pl-2' data-testid='country-info-error'>
          Error loading country data. {error?.message}
        </span>
      ) : (
        acCountry && (
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
              <CountryInfoGrid acCountry={acCountry} />
            </div>
          </>
        )
      )}
    </Card>
  );
}

CountryInfo.displayName = 'CountryInfo';
export { CountryInfo };
