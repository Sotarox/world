'use client';

import { Button } from '@/components/custom/button';
import { useSidebar } from '@/components/custom/sidebar';
import { PageBackground } from '@/components/world/page-background';
import { randomCountryIso2 } from '@/model/country-iso2-name-map';
import { Link } from '@mui/material';
import {
  ChartNoAxesCombinedIcon,
  MapPinnedIcon,
  TabletSmartphoneIcon,
} from 'lucide-react';
import { useRouter } from 'next/dist/client/components/navigation';
import { useEffect } from 'react';
import { CardBenefit } from './card-benefit';

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
      <div className='p-4 flex flex-col gap-14 animate-zoom-in'>
        <div className='grid grid-cols-1 gap-4 mt-14 md:justify-items-center'>
          <h1 className='text-8xl font-bold gradient-text'>World App</h1>
          <span className='text-3xl font-bold text-gray-400 dark:text-gray-500'>
            Demo web application for an explorative information system
          </span>
        </div>
        <div className='flex flex-col ml-5 xm:ml-0 sm:flex-row w-fit sm:self-center gap-3 sm:gap-2'>
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
        {/* App's beneficial points */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <CardBenefit
            icon={<MapPinnedIcon />}
            title='250+'
            description='Country data, aggregated via Java Spring Boot'
          />
          <CardBenefit
            icon={<TabletSmartphoneIcon />}
            title='Responsive'
            description='Design by TailwindCSS + shadcn/ui'
          />
          <CardBenefit
            icon={<ChartNoAxesCombinedIcon />}
            title='Graphical'
            description='Visualization for key data'
          />
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
    </PageBackground>
  );
}

HomePageContent.displayName = 'HomePageContent';
export { HomePageContent };
