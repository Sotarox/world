'use client';

import { useEffect } from 'react';
import { Button } from '@/components/custom/button';
import { useSidebar } from '@/components/custom/sidebar';
import { Card, CardTitle } from '@/components/world/card';
import { cn } from '@/lib/utils';
import { randomCountryIso2 } from '@/model/country-iso2-name-map';
import { Link } from '@mui/material';
import { useRouter } from 'next/dist/client/components/navigation';

const gradientTextStyle =
  'bg-gradient-to-r from-green-500 via-teal-500 to-blue-400 inline-block text-transparent bg-clip-text';
const animationStyle = 'animate-in fade-in zoom-in-90 duration-300';
const cardStyle = 'px-4 gap-2';

function HomePageContent() {
  const router = useRouter();
  const { state, stateMobile, toggleSidebar } = useSidebar();

  const mapMaskStyle = {
    WebkitMaskImage: "url('/dotted-world-map.svg')",
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center top',
    WebkitMaskSize: 'min(980px, 110vw) auto',
    maskImage: "url('/dotted-world-map.svg')",
    maskRepeat: 'no-repeat',
    maskPosition: 'center top',
    maskSize: 'min(980px, 110vw) auto',
  } as const;

  useEffect(() => {
    if (stateMobile === 'expanded' || state === 'expanded') {
      toggleSidebar();
    }
  }, []);

  return (
    <div className={cn('relative isolate overflow-hidden p-4', animationStyle)}>
      {/* Background */}
      <div aria-hidden className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-teal-50/40 to-transparent dark:via-slate-900/30' />
        <div
          className='absolute left-0 right-0 top-0 h-[420px] md:h-[520px] bg-teal-700/20 dark:bg-sky-100/12'
          style={mapMaskStyle}
        />
        <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(20,45,80,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,45,80,0.11)_1px,transparent_1px)] bg-[size:42px_42px] opacity-70 [mask-image:radial-gradient(ellipse_at_55%_20%,black_42%,transparent_95%)] dark:bg-[linear-gradient(to_right,rgba(180,220,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(180,220,255,0.12)_1px,transparent_1px)]' />
      </div>
      {/* Content */}
      <div className='flex flex-col gap-14'>
        <div className='grid grid-cols-1 gap-4 mt-14 md:justify-items-center'>
          <h1 className={cn('text-8xl font-bold', gradientTextStyle)}>
            World App
          </h1>
          <span className='text-3xl font-bold text-gray-400 dark:text-gray-500'>
            Demo web application for an explorative information system
          </span>
        </div>
        <div className='flex self-center gap-2'>
          <Button
            onClick={() => {
              router.push(`/countries/${randomCountryIso2().toLowerCase()}`);
            }}
            className='bg-teal-500 dark:bg-teal-400 rounded-xl'
          >
            OK, Show me a country
          </Button>
          <Button
            onClick={toggleSidebar}
            variant='secondary'
            className='rounded-xl border-1'
          >
            List all countries
          </Button>
        </div>
        {/* Appeal points */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <Card className={cn(cardStyle)}>
            <CardTitle>
              <span
                className={cn('text-3xl font-bold truncate', gradientTextStyle)}
              >
                250+
              </span>
            </CardTitle>
            <span className='text-lg font-medium text-gray-500'>
              Country data, aggregated via Spring Boot
            </span>
          </Card>
          <Card className={cn(cardStyle)}>
            <CardTitle className='truncate'>
              <span
                className={cn('text-3xl font-bold truncate', gradientTextStyle)}
              >
                Responsive
              </span>
            </CardTitle>
            <span className='text-lg font-medium text-gray-500'>
              Design by TailwindCSS + shadcn/ui
            </span>
          </Card>
          <Card className={cn(cardStyle)}>
            <CardTitle className='truncate'>
              <span className={cn('text-3xl font-bold', gradientTextStyle)}>
                Graphical
              </span>
            </CardTitle>
            <span className='text-lg font-medium text-gray-500'>
              Visualization for key data
            </span>
          </Card>
        </div>

        <div className='flex flex-col items-end self-end'>
          <span className='text-lg font-bold text-gray-500'>
            Created by Sotaro Shirai
          </span>
          <Link
            href='https://github.com/Sotarox/world'
            target='_blank'
            rel='noopener'
          >
            Source Code (GitHub)
          </Link>
        </div>
      </div>
    </div>
  );
}

HomePageContent.displayName = 'HomePageContent';
export { HomePageContent };
