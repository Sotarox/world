import { cn } from '@/lib/utils';
import React from 'react';

interface InfoCardProps {
  title: string | null;
  value: string | null;
  className?: string;
}

function InfoCard(props: InfoCardProps) {
  const { title, value, className } = props;
  return (
    <div className={cn('flex flex-col p-2', className)}>
      <span className='text-lg font-extralight'>{title}</span>
      <span className='text-base'>{value}</span>
    </div>
  );
}

export default InfoCard;
export type { InfoCardProps };
