import React from 'react';
import { Card } from '@/components/world/card';
import { KeyboardArrowRight } from '@mui/icons-material';
import { cn } from '@/lib/utils';

interface InfoCardSelectableProps {
  isSelected?: boolean;
  title: string | null;
  value: string | null;
}

function InfoCardSelectable(props: InfoCardSelectableProps) {
  const { isSelected, title, value } = props;
  return (
    <Card
      className={cn(
        'w-full p-2 text-left hover:bg-neutral-500/5 dark:hover:bg-gt-subtle/70'
      )}
    >
      <div className='flex flex-start'>
        <KeyboardArrowRight
          className='shrink-0'
          style={{
            transform: isSelected ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 200ms ease',
          }}
        />
        <div className='flex flex-col min-w-0'>
          <span className='text-lg font-extralight truncate'>{title}</span>
          <span className='text-base truncate'>{value}</span>
        </div>
      </div>
    </Card>
  );
}

export default InfoCardSelectable;
