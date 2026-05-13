import { Card } from '@/components/world/card';
import { Badge } from '@/components/shadcn/badge';
import { cn } from '@/lib/utils';

interface CardBadgesProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  className?: string;
}

function CardBadges(props: CardBadgesProps) {
  const { title, items, icon, className } = props;
  return (
    <Card className={cn('px-3 py-2 gap-2 min-w-0', className)}>
      <div className='flex items-center gap-2'>
        <span className='inline-flex size-4 shrink-0 items-center justify-center'>
          {icon}
        </span>
        <span className='truncate text-lg font-normal'>{title}</span>
      </div>
      <ul className='w-full min-w-0 list-disc list-inside'>
        {items.map((item, index) => (
          <Badge key={index} variant='secondary' className='truncate'>
            {item}
          </Badge>
        ))}
      </ul>
    </Card>
  );
}

CardBadges.displayName = 'CardBadges';
export { CardBadges };
