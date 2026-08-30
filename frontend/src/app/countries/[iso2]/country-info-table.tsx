import SortableInfoCard from '@/components/world/sortable-info-card';
import type { ACCountry } from '@/model/ac-country';
import {
  concatStringsWithComma,
  formatCoordinate,
  getIndependentLabel,
} from '@/utils/utils';
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

interface CountryInfoTableProps {
  acCountry: ACCountry;
}
function CountryInfoTable(props: CountryInfoTableProps) {
  const { acCountry } = props;

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
      <SortableInfoCard
        index={0}
        title='Region'
        value={acCountry.region.toString() ?? 'N/A'}
      />
      <SortableInfoCard
        index={1}
        title='Subregion'
        value={acCountry.subregion.toString() ?? 'N/A'}
      />
      <SortableInfoCard
        index={2}
        title='Coordinate'
        value={acCountry ? formatCoordinate(acCountry.latlng) : 'N/A'}
      />
      <SortableInfoCard
        index={3}
        title='Capital'
        value={acCountry.capital ?? 'N/A'}
      />
      <SortableInfoCard
        index={4}
        title='Country ISO2'
        value={acCountry.alpha2Code ?? 'N/A'}
      />
      <SortableInfoCard
        index={5}
        title='Country ISO3'
        value={acCountry.alpha3Code ?? 'N/A'}
      />
      <SortableInfoCard
        index={6}
        title='Top domain'
        value={concatStringsWithComma(acCountry.topLevelDomain)}
      />
      <SortableInfoCard
        index={7}
        title='Phone prefix'
        value={acCountry.callingCodes[0] ?? 'N/A'}
      />
      <SortableInfoCard
        index={8}
        title='Currency'
        value={acCountry.currencies ? acCountry.currencies[0].name : 'N/A'}
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
          acCountry.languages.map((lang) => lang.name) ?? ['N/A']
        )}
      />
      <SortableInfoCard
        index={11}
        title='Time zone'
        value={concatStringsWithComma(acCountry.timezones ?? ['N/A'])}
      />
    </DragDropProvider>
  );
}

CountryInfoTable.displayName = 'CountryInfoTable';
export { CountryInfoTable };
