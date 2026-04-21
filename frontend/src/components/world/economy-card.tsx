import { memo } from 'react';
import { EconomyApiResult } from '@/api/use-economy-api';
import InfoCardSelectable from '@/components/world/info-card-selectable';

interface EconomyCardProps {
  economyApiResult: EconomyApiResult;
  isSelected: boolean;
}

const EconomyCard = memo(function EconomyCard(props: EconomyCardProps) {
  const { economyApiResult, isSelected } = props;
  const { newestAnnualData, error, loading } = economyApiResult;

  const getValue = () => {
    if (loading) return 'Loading...';
    if (error) return 'Error';
    return newestAnnualData.gdpValue;
  };

  return (
    <InfoCardSelectable
      title='Economy'
      value={getValue()}
      isSelected={isSelected}
    />
  );
});

EconomyCard.displayName = 'EconomyCard';
export { EconomyCard };
