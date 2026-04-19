import { AirportList } from '@/app/countries/[iso2]/airport-list';
import { PopulationInfo } from '@/app/countries/[iso2]/population-info';
import { EconomyInfo } from '@/components/world/economy-info';
import InfoCardClickable from '@/components/world/info-card-clickable';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import type { ACCountryNav } from '@/model/ac-country';
import { type Country } from '@/model/country';
import { TopicType } from '@/model/misc';
import { useTopicStore } from '@/store/topic-store';
import { formatNumberWithComma } from '@/utils/utils';
import 'flag-icons/css/flag-icons.min.css';
import { useState } from 'react';

interface CountryInfoTopicsProps {
  iso2: string;
  country: Country;
  countryNavsSortedByPopulation: ACCountryNav[];
}
function CountryInfoTopics(props: CountryInfoTopicsProps) {
  const { iso2, country, countryNavsSortedByPopulation } = props;
  const { currentTopic, toggleCurrentTopic } = useTopicStore();
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(-1);
  const isMobile = useIsMobile();

  const onClickTopic = (topic: TopicType, index: number) => {
    if (currentTopic === topic) {
      toggleCurrentTopic('');
      setSelectedTopicIndex(-1);
    } else {
      toggleCurrentTopic(topic);
      setSelectedTopicIndex(index);
    }
  };

  const DetailInfo = () => {
    if (currentTopic === '') {
      return null;
    }
    const targetRowNumber = isMobile
      ? Math.floor(selectedTopicIndex / 2) + 2
      : Math.floor(selectedTopicIndex / 4) + 2;
    return (
      <div className={cn('col-span-full')} style={{ gridRow: targetRowNumber }}>
        {currentTopic === 'population' && (
          <PopulationInfo
            iso2={iso2}
            continentCode={country.continent}
            data={countryNavsSortedByPopulation}
            isVisible={true}
          />
        )}
        {currentTopic === 'economy' && (
          <EconomyInfo iso2={iso2} isVisible={true} />
        )}
        {currentTopic === 'airports' && (
          <AirportList iso2={iso2} isVisible={true} />
        )}
      </div>
    );
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
      <InfoCardClickable
        title='Economy'
        value='GDP'
        isSelected={currentTopic === 'economy'}
        onClick={() => onClickTopic('economy', 1)}
      />
      <InfoCardClickable
        title='Airports'
        value={country.totalNumberOfAirports.toString()}
        isSelected={currentTopic === 'airports'}
        onClick={() => onClickTopic('airports', 2)}
      />
      <DetailInfo />
    </div>
  );
}

export { CountryInfoTopics };
