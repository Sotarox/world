import { cn } from '@/lib/utils';
import React from 'react';
import { useSortable } from '@dnd-kit/react/sortable';
import { GripVerticalIcon } from 'lucide-react';

interface SortableInfoCardProps {
  index: number;
  title: string;
  value: string | null;
  className?: string;
}

function SortableInfoCard(props: SortableInfoCardProps) {
  const { index, title, value, className } = props;
  const { ref, handleRef } = useSortable({ id: title, index });
  return (
    <div
      ref={ref}
      className={cn('flex p-2 items-center justify-between', className)}
    >
      <div className='flex flex-col'>
        <span className='text-lg font-extralight'>{title}</span>
        <span className='text-base'>{value}</span>
      </div>
      <GripVerticalIcon
        className='size-3 min-w-3 cursor-grab text-gray-400 dark:text-gray-500'
        ref={handleRef}
      />
    </div>
  );
}

export default SortableInfoCard;
export type { SortableInfoCardProps };
