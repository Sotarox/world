import { memo } from 'react';
import { EconomyApiResult } from '@/api/use-economy-api';
import InfoCardClickable from '@/components/world/info-card-clickable';

interface EconomyCardProps {
  economyApiResult: EconomyApiResult;
  isSelected: boolean;
  onClick: () => void;
}

const EconomyCard = memo(function EconomyCard(props: EconomyCardProps) {
  const { economyApiResult, isSelected, onClick } = props;
  const { newestAnnualData, error, loading } = economyApiResult;

  const getValue = () => {
    if (loading) return 'Loading...';
    if (error) return 'Error';
    return newestAnnualData.gdpValue;
  };

  return (
    <InfoCardClickable
      title='Economy'
      value={getValue()}
      isSelected={isSelected}
      onClick={onClick}
    />
  );
});

EconomyCard.displayName = 'EconomyCard';
export { EconomyCard };
