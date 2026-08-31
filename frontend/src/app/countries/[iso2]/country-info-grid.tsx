import SortableInfoCard from '@/components/world/sortable-info-card';
import type { ACCountry } from '@/model/ac-country';
import type { InfoCardTitles } from '@/model/country';
import { useSortableInfoCard } from '@/store/sortable-country-info-store';
import {
  concatStringsWithComma,
  formatCoordinate,
  getIndependentLabel,
} from '@/utils/utils';
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import {
  ALargeSmallIcon,
  AtSignIcon,
  BuildingIcon,
  CircleDollarSignIcon,
  Clock4Icon,
  CompassIcon,
  FlagIcon,
  HashIcon,
  LandPlotIcon,
  MapPinnedIcon,
  PhoneIcon,
} from 'lucide-react';

interface CountryInfoGridProps {
  acCountry: ACCountry;
}
function CountryInfoGrid(props: CountryInfoGridProps) {
  const { acCountry } = props;
  const { infoCards, setInfoCards } = useSortableInfoCard();
  const infoCardValues: Record<
    (typeof InfoCardTitles)[number],
    { value: string; icon: React.ReactNode }
  > = {
    Region: {
      value: acCountry.region.toString() ?? 'N/A',
      icon: <LandPlotIcon />,
    },
    Subregion: {
      value: acCountry.subregion.toString() ?? 'N/A',
      icon: <MapPinnedIcon />,
    },
    Coordinate: {
      value: formatCoordinate(acCountry.latlng),
      icon: <CompassIcon />,
    },
    Capital: { value: acCountry.capital ?? 'N/A', icon: <BuildingIcon /> },
    'Country ISO2': {
      value: acCountry.alpha2Code ?? 'N/A',
      icon: <HashIcon />,
    },
    'Country ISO3': {
      value: acCountry.alpha3Code ?? 'N/A',
      icon: <HashIcon />,
    },
    'Top domain': {
      value: concatStringsWithComma(acCountry.topLevelDomain),
      icon: <AtSignIcon />,
    },
    'Phone prefix': {
      value: acCountry.callingCodes[0] ?? 'N/A',
      icon: <PhoneIcon />,
    },
    Currency: {
      value: acCountry.currencies ? acCountry.currencies[0].name : 'N/A',
      icon: <CircleDollarSignIcon />,
    },
    Independent: { value: getIndependentLabel(acCountry), icon: <FlagIcon /> },
    Language: {
      value: concatStringsWithComma(
        acCountry.languages.map((lang) => lang.name) ?? ['N/A']
      ),
      icon: <ALargeSmallIcon />,
    },
    'Time zone': {
      value: concatStringsWithComma(acCountry.timezones ?? ['N/A']),
      icon: <Clock4Icon />,
    },
  };
  const resortInfoCards = (fromIndex: number, toIndex: number) => {
    const updatedInfoCards = [...infoCards];
    const [movedCard] = updatedInfoCards.splice(fromIndex, 1);
    updatedInfoCards.splice(toIndex, 0, movedCard);
    return updatedInfoCards.map((card, idx) => ({ ...card, index: idx }));
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
          key={card.title}
          index={card.index}
          title={card.title}
          value={infoCardValues[card.title].value}
          icon={infoCardValues[card.title].icon}
        />
      ))}
    </DragDropProvider>
  );
}

CountryInfoGrid.displayName = 'CountryInfoGrid';
export { CountryInfoGrid };
