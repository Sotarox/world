import { useEconomyApi } from '@/api/use-economy-api';
import { AirportList } from '@/app/countries/[iso2]/airport-list';
import { PopulationInfo } from '@/app/countries/[iso2]/population-info';
import { EconomyCard } from '@/components/world/economy-card';
import { EconomyInfo } from '@/components/world/economy-info';
import InfoCardClickable from '@/components/world/info-card-clickable';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { type Country } from '@/model/country';
import { type EconomyApiResult } from '@/api/use-economy-api';
import { TopicType } from '@/model/misc';
import { useTopicStore } from '@/store/topic-store';
import { formatNumberWithComma } from '@/utils/utils';
import 'flag-icons/css/flag-icons.min.css';
import { memo } from 'react';

interface DetailInfoProps {
  iso2: string;
  currentTopic: TopicType;
  selectedTopicIndex: number;
  continentCode: string;
  economyApiResult: EconomyApiResult;
  isMobile: boolean;
}

// since memo is used, this component doesn't re-render when economyApiResult changes
const DetailInfo = memo(function DetailInfo({
  iso2,
  currentTopic,
  selectedTopicIndex,
  continentCode,
  economyApiResult,
  isMobile,
}: DetailInfoProps) {
  if (currentTopic === '') return null;
  const targetRowNumber = isMobile
    ? Math.floor(selectedTopicIndex / 2) + 2
    : Math.floor(selectedTopicIndex / 4) + 2;
  return (
    <div
      className={cn('col-span-full animate-in fade-in zoom-in-90 duration-300')}
      style={{ gridRow: targetRowNumber }}
    >
      {currentTopic === 'population' && (
        <PopulationInfo iso2={iso2} continentCode={continentCode} />
      )}
      {currentTopic === 'economy' && (
        <EconomyInfo economyApiResult={economyApiResult} />
      )}
      {currentTopic === 'airports' && <AirportList iso2={iso2} />}
    </div>
  );
});

interface CountryInfoTopicsProps {
  iso2: string;
  country: Country;
}
function CountryInfoTopics(props: CountryInfoTopicsProps) {
  const { iso2, country } = props;
  const { currentTopic, toggleCurrentTopic, selectedTopicIndex } =
    useTopicStore();
  const economyApiResult = useEconomyApi(iso2);

  const isMobile = useIsMobile();

  const onClickTopic = (topic: TopicType, index: number) => {
    if (currentTopic === topic) {
      toggleCurrentTopic('', -1);
    } else {
      toggleCurrentTopic(topic, index);
    }
  };

  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 items-start [&>*]:min-w-0'>
      <InfoCardClickable
        title='Population'
        value={
          country.population ? formatNumberWithComma(country.population) : 'N/A'
        }
        isSelected={currentTopic === 'population'}
        onClick={() => onClickTopic('population', 0)}
      />
      <EconomyCard
        economyApiResult={economyApiResult}
        isSelected={currentTopic === 'economy'}
        onClick={() => onClickTopic('economy', 1)}
      />
      <InfoCardClickable
        title='Airports'
        value={country.totalNumberOfAirports.toString()}
        isSelected={currentTopic === 'airports'}
        onClick={() => onClickTopic('airports', 2)}
      />
      <DetailInfo
        currentTopic={currentTopic}
        selectedTopicIndex={selectedTopicIndex}
        iso2={iso2}
        continentCode={country.continent}
        economyApiResult={economyApiResult}
        isMobile={isMobile}
      />
    </div>
  );
}
CountryInfoTopics.displayName = 'CountryInfoTopics';
export { CountryInfoTopics };
