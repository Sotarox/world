import { cn } from '@/lib/utils';
import React from 'react';
import { useSortable } from '@dnd-kit/react/sortable';

interface SortableInfoCardProps {
  index: number;
  title: string;
  value: string | null;
  className?: string;
}

function SortableInfoCard(props: SortableInfoCardProps) {
  const { index, title, value, className } = props;
  const { ref } = useSortable({ id: title, index });
  return (
    <div ref={ref} className={cn('flex flex-col p-2', className)}>
      <span className='text-lg font-extralight'>{title}</span>
      <span className='text-base'>{value}</span>
    </div>
  );
}

export default SortableInfoCard;
export type { SortableInfoCardProps };
