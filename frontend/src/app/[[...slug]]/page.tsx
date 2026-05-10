import { Button } from '@/components/custom/button';
import { Card, CardTitle } from '@/components/world/card';
import { cn } from '@/lib/utils';
import { Link } from '@mui/material';

export function generateStaticParams() {
  // Only generate the root path as a static param
  // All other routes will be handled client-side by React Router
  return [{ slug: [] }];
}

const gradientTextStyle =
  'bg-gradient-to-r from-green-500 via-teal-500 to-blue-400 inline-block text-transparent bg-clip-text';
const animationStyle = 'animate-in fade-in zoom-in-90 duration-300';
const cardStyle = 'px-2 gap-2';

function HomePage() {
  return (
    <div className={cn('relative isolate overflow-hidden p-4', animationStyle)}>
      <div aria-hidden className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-teal-50/40 to-transparent dark:via-slate-900/30' />
        <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(20,45,80,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,45,80,0.11)_1px,transparent_1px)] bg-[size:42px_42px] opacity-70 dark:bg-[linear-gradient(to_right,rgba(180,220,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(180,220,255,0.12)_1px,transparent_1px)]' />
        <div className='absolute inset-0 [mask-image:radial-gradient(ellipse_at_65%_20%,black_25%,transparent_78%)] bg-white dark:bg-black/20' />
      </div>

      <div className='flex flex-col gap-14'>
        <h1
          className={cn(
            'text-7xl font-bold self-center mt-20 mb-5',
            gradientTextStyle
          )}
        >
          World App
        </h1>
        <span className='text-3xl font-bold text-gray-500 -mt-12'>
          Demo web application for an explorative information system
        </span>
        <div className='flex self-center gap-2'>
          <Button className='bg-teal-500 dark:bg-teal-400 rounded-xl'>
            OK, Show me a country
          </Button>
          <Button variant='secondary' className='rounded-xl'>
            List all countries
          </Button>
        </div>

        <div className='grid grid-cols-3 gap-4'>
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

export default HomePage;
