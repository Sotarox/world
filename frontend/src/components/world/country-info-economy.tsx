import InfoCardClickable from '@/components/world/info-card-clickable';
import { useApi } from '@/api/use-api';
import { WbEconomyWrapper } from '@/model/wb-economy';
import { useTopicStore } from '@/store/topic-store';

function CountryInfoEconomy({ iso2 }: { iso2: string }) {
  const { currentTopic, toggleCurrentTopic } = useTopicStore();
  const economyWrapper = useApi<WbEconomyWrapper>(`/economy/${iso2}`);
  return (
    <>
      <InfoCardClickable
        title='GDP Value'
        value={
          economyWrapper?.data[0]?.gdpValue
            ? `$${economyWrapper.data[0].gdpValue.toLocaleString()}`
            : 'N/A'
        }
        isSelected={currentTopic === 'economy'}
        onClick={() => toggleCurrentTopic('economy')}
      />
      <InfoCardClickable
        title='GDP growth rate'
        value={
          economyWrapper?.data[0]?.growthRate
            ? `${economyWrapper.data[0].growthRate.toFixed(2)}%`
            : 'N/A'
        }
        isSelected={currentTopic === 'economy'}
        onClick={() => toggleCurrentTopic('economy')}
      />
    </>
  );
}

export { CountryInfoEconomy };
