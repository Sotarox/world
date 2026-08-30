import { Card } from '@/components/world/card';
import { CountryShape } from '@/components/world/country-shape';
import SortableInfoCard from '@/components/world/sortable-info-card';
import type { ACCountry } from '@/model/ac-country';
import {
  nextCountryNav,
  previousCountryNav,
} from '@/model/country-iso2-name-map';
import { useCountryNav } from '@/store/country-nav-store';
import {
  concatStringsWithComma,
  formatCoordinate,
  getIndependentLabel,
} from '@/utils/utils';
import 'flag-icons/css/flag-icons.min.css';
import { AdjacentNavigation } from './adjacent-navigation';
import CountryInfoHeader from './country-info-header';
import { useQuery } from '@tanstack/react-query';
import api from '@/api/axios';
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

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
    <DragDropProvider
      onDragEnd={(event) => {
        const { source, target } = event.operation;
        if (isSortable(source)) {
          console.log('source.index', source.index);
          console.log('source.initialIndex', source.initialIndex);
        }
        if (isSortable(target)) {
          console.log('target.index', target.index);
        }
      }}
    >
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
                <SortableInfoCard
                  index={0}
                  title='Region'
                  value={acCountry?.region.toString() ?? 'N/A'}
                />
                <SortableInfoCard
                  index={1}
                  title='Subregion'
                  value={acCountry?.subregion.toString() ?? 'N/A'}
                />
                <SortableInfoCard
                  index={2}
                  title='Coordinate'
                  value={acCountry ? formatCoordinate(acCountry.latlng) : 'N/A'}
                />
                <SortableInfoCard
                  index={3}
                  title='Capital'
                  value={acCountry?.capital ?? 'N/A'}
                />
                <SortableInfoCard
                  index={4}
                  title='Country ISO2'
                  value={acCountry?.alpha2Code ?? 'N/A'}
                />
                <SortableInfoCard
                  index={5}
                  title='Country ISO3'
                  value={acCountry?.alpha3Code ?? 'N/A'}
                />
                <SortableInfoCard
                  index={6}
                  title='Top domain'
                  value={concatStringsWithComma(acCountry?.topLevelDomain)}
                />
                <SortableInfoCard
                  index={7}
                  title='Phone prefix'
                  value={acCountry?.callingCodes[0] ?? 'N/A'}
                />
                <SortableInfoCard
                  index={8}
                  title='Currency'
                  value={
                    acCountry?.currencies ? acCountry.currencies[0].name : 'N/A'
                  }
                />
                <SortableInfoCard
                  index={9}
                  title='Independent'
                  value={getIndependentLabel(acCountry)}
                />
                <SortableInfoCard
                  index={10}
                  title='Language'
                  value={concatStringsWithComma(
                    acCountry?.languages?.map((lang) => lang.name) ?? ['N/A']
                  )}
                />
                <SortableInfoCard
                  index={11}
                  title='Time zone'
                  value={concatStringsWithComma(
                    acCountry?.timezones ?? ['N/A']
                  )}
                />
              </div>
            </>
          )
        )}
      </Card>
    </DragDropProvider>
  );
}

CountryInfo.displayName = 'CountryInfo';
export { CountryInfo };
