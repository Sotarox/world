import { Card } from '@/components/shadcn/card';
import { cn } from '@/lib/utils';

interface CardListProps {
  title: string;
  items: string[];
  className?: string;
}

function CardList(props: CardListProps) {
  const { title, items, className } = props;
  return (
    <Card className={cn('px-3 py-2 gap-2 min-w-0', className)}>
      <span className='block w-full truncate text-lg font-normal text-slate-900 dark:text-white'>
        {title}
      </span>
      <ul className='w-full min-w-0 list-disc list-inside text-slate-700 dark:text-white'>
        {items.map((item, index) => (
          <li key={index} className='truncate'>
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}

CardList.displayName = 'CardList';
export { CardList };
