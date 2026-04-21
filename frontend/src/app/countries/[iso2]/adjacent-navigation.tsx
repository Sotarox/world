'use client';

import { ACCountryNav } from '@/model/ac-country';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/shadcn/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn/tooltip';

interface AdjacentNavigationProps {
  order: 'previous' | 'next';
  nav: ACCountryNav | undefined;
}

function AdjacentNavigation(props: AdjacentNavigationProps) {
  const { order, nav } = props;
  if (!nav) {
    return <></>;
  }
  const router = useRouter();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='ghost'
          size='icon-lg'
          onClick={() =>
            router.push(`/countries/${nav.alpha2Code.toLowerCase()}`)
          }
        >
          {order === 'previous' ? (
            <ChevronLeft className='size-6' />
          ) : (
            <ChevronRight className='size-6' />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>{nav.name}</span>
      </TooltipContent>
    </Tooltip>
  );
}

AdjacentNavigation.displayName = 'AdjacentNavigation';
export { AdjacentNavigation };
