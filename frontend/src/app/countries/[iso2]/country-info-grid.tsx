import SortableInfoCard from '@/components/world/sortable-info-card';
import type { ACCountry } from '@/model/ac-country';
import { useSortableInfoCard } from '@/store/sortable-country-info-store';
import {
  concatStringsWithComma,
  formatCoordinate,
  getIndependentLabel,
} from '@/utils/utils';
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

interface CountryInfoGridProps {
  acCountry: ACCountry;
}
function CountryInfoGrid(props: CountryInfoGridProps) {
  const { acCountry } = props;
  const { infoCards, setInfoCards } = useSortableInfoCard();
  const infoCardTable: Record<string, string> = {
    Region: acCountry.region.toString() ?? 'N/A',
    Subregion: acCountry.subregion.toString() ?? 'N/A',
    Coordinate: acCountry ? formatCoordinate(acCountry.latlng) : 'N/A',
    Capital: acCountry.capital ?? 'N/A',
    'Country ISO2': acCountry.alpha2Code ?? 'N/A',
    'Country ISO3': acCountry.alpha3Code ?? 'N/A',
    'Top domain': concatStringsWithComma(acCountry.topLevelDomain),
    'Phone prefix': acCountry.callingCodes[0] ?? 'N/A',
    Currency: acCountry.currencies ? acCountry.currencies[0].name : 'N/A',
    Independent: getIndependentLabel(acCountry),
    Language: concatStringsWithComma(
      acCountry.languages.map((lang) => lang.name) ?? ['N/A']
    ),
    'Time zone': concatStringsWithComma(acCountry.timezones ?? ['N/A']),
  };
  const resortInfoCards = (fromIndex: number, toIndex: number) => {
    const updatedInfoCards = [...infoCards];
    const [movedCard] = updatedInfoCards.splice(fromIndex, 1);
    updatedInfoCards.splice(toIndex, 0, movedCard);
    return updatedInfoCards;
  };

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        const { source, target } = event.operation;
        if (isSortable(source) && isSortable(target)) {
          const updatedInfoCards = resortInfoCards(
            source.initialIndex,
            target.index
          );
          setInfoCards(updatedInfoCards);
        }
      }}
    >
      {infoCards.map((card) => (
        <SortableInfoCard
          key={card.index}
          index={card.index}
          title={card.title}
          value={infoCardTable[card.title]}
        />
      ))}
    </DragDropProvider>
  );
}

CountryInfoGrid.displayName = 'CountryInfoGrid';
export { CountryInfoGrid };
