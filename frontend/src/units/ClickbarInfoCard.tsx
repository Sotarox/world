import React from 'react';
import { Card } from '@/components/ui/card';
import { KeyboardArrowRight, KeyboardArrowDown } from '@mui/icons-material';
import { cn } from '@/lib/utils';

interface ClickbarInfoCardProps {
  isSelected?: boolean;
  title: string | null;
  value: string | null;
  onClick?: () => void;
}

function ClickbarInfoCard(props: ClickbarInfoCardProps) {
  const { isSelected, title, value, onClick } = props;
  const Icon = isSelected ? <KeyboardArrowDown /> : <KeyboardArrowRight />;
  return (
    <button onClick={() => onClick && onClick()} className=''>
      <Card className={cn('hover:bg-black/50 w-full p-2 text-left')}>
        <div className='flex flex-start'>
          {Icon}
          <div className='flex flex-col'>
            <span className='text-lg font-extralight'>{title}</span>
            <span className='text-base'>{value}</span>
          </div>
        </div>
      </Card>
    </button>
  );
}

export default ClickbarInfoCard;
