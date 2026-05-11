'use client';

import { useEffect } from 'react';
import { Button } from '@/components/custom/button';
import { useSidebar } from '@/components/custom/sidebar';
import { Card, CardTitle } from '@/components/world/card';
import { cn } from '@/lib/utils';
import { randomCountryIso2 } from '@/model/country-iso2-name-map';
import { Link } from '@mui/material';
import { useRouter } from 'next/dist/client/components/navigation';
import { PageBackground } from '@/components/world/page-background';

const cardStyle = 'px-4 gap-2';

function HomePageContent() {
  const router = useRouter();
  const { state, stateMobile, toggleSidebar } = useSidebar();

  useEffect(() => {
    if (stateMobile === 'expanded' || state === 'expanded') {
      toggleSidebar();
    }
  }, []);

  return (
    <PageBackground showMap>
      <div className='p-4 animate-zoom-in'>
        <div className='flex flex-col gap-14'>
          <div className='grid grid-cols-1 gap-4 mt-14 md:justify-items-center'>
            <h1 className='text-8xl font-bold gradient-text'>World App</h1>
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
                <span className='text-3xl font-bold truncate gradient-text'>
                  250+
                </span>
              </CardTitle>
              <span className='text-lg font-medium text-gray-500'>
                Country data, aggregated via Spring Boot
              </span>
            </Card>
            <Card className={cn(cardStyle)}>
              <CardTitle className='truncate'>
                <span className='text-3xl font-bold truncate gradient-text'>
                  Responsive
                </span>
              </CardTitle>
              <span className='text-lg font-medium text-gray-500'>
                Design by TailwindCSS + shadcn/ui
              </span>
            </Card>
            <Card className={cn(cardStyle)}>
              <CardTitle className='truncate'>
                <span className='text-3xl font-bold truncate gradient-text'>
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
    </PageBackground>
  );
}

HomePageContent.displayName = 'HomePageContent';
export { HomePageContent };
