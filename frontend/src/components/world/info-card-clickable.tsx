import React from 'react';
import { Card } from '@/components/shadcn/card';
import { KeyboardArrowRight, KeyboardArrowDown } from '@mui/icons-material';
import { cn } from '@/lib/utils';

interface InfoCardClickableProps {
  isSelected?: boolean;
  title: string | null;
  value: string | null;
  onClick?: () => void;
}

function InfoCardClickable(props: InfoCardClickableProps) {
  const { isSelected, title, value, onClick } = props;
  const Icon = isSelected ? <KeyboardArrowDown /> : <KeyboardArrowRight />;
  return (
    <button onClick={() => onClick && onClick()}>
      <Card
        className={cn(
          'w-full p-2 text-left hover:bg-neutral-500/5 dark:hover:bg-gt-subtle/70'
        )}
      >
        <div className='flex flex-start'>
          {Icon}
          <div className='flex flex-col min-w-0'>
            <span className='text-lg font-extralight truncate'>{title}</span>
            <span className='text-base truncate'>{value}</span>
          </div>
        </div>
      </Card>
    </button>
  );
}

export default InfoCardClickable;
