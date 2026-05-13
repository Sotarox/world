'use client';

import { Card, CardTitle } from '@/components/world/card';
import { cn } from '@/lib/utils';
import { cloneElement, isValidElement, type ReactElement } from 'react';

interface CardBenefitProps {
  icon: ReactElement<{ className?: string }>;
  title: string;
  description: string;
  iconClassName?: string;
  iconContainerClassName?: string;
}

function CardBenefit({
  icon,
  title,
  description,
  iconClassName = 'size-full',
  iconContainerClassName = 'size-8 sm:size-10',
}: CardBenefitProps) {
  const sizedIcon = isValidElement(icon)
    ? cloneElement(icon, {
        className: cn(icon.props.className, iconClassName),
      })
    : icon;

  return (
    <Card className='px-4 gap-0 sm:gap-2 sm:items-center'>
      <div className='flex flex-row sm:flex-col items-center gap-1'>
        <span
          className={cn(
            'inline-flex shrink-0 items-center justify-center self-center text-green-500 sm:text-teal-500',
            iconContainerClassName
          )}
        >
          {sizedIcon}
        </span>
        <CardTitle>
          <span className='text-3xl font-bold truncate gradient-text'>
            {title}
          </span>
        </CardTitle>
      </div>
      <span className='text-lg font-medium text-gray-500 tracking-tight'>
        {description}
      </span>
    </Card>
  );
}

CardBenefit.displayName = 'CardBenefit';
export { CardBenefit };
