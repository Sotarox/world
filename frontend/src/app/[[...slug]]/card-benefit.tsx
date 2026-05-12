'use client';

import { Card, CardTitle } from '@/components/world/card';

interface CardBenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function CardBenefit({ icon, title, description }: CardBenefitProps) {
  return (
    <Card className='px-4 gap-0 sm:gap-2 sm:items-center'>
      <div className='flex flex-row sm:flex-col items-center'>
        <span className='size-8 self-center text-green-500 sm:text-teal-500'>
          {icon}
        </span>
        <CardTitle>
          <span className='text-3xl font-bold truncate gradient-text'>
            {title}
          </span>
        </CardTitle>
      </div>
      <span className='text-lg font-medium text-gray-500'>{description}</span>
    </Card>
  );
}

CardBenefit.displayName = 'CardBenefit';
export { CardBenefit };
