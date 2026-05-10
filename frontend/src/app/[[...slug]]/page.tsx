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
    <div className={cn('p-4 flex flex-col gap-14', animationStyle)}>
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
        <Button className='bg-teal-500 dark:bg-teal-400'>
          OK, Show me a country
        </Button>
        <Button variant='outline'>List all countries</Button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <Card className={cn(cardStyle)}>
          <CardTitle>
            <span className={cn('text-3xl font-bold', gradientTextStyle)}>
              250+
            </span>
          </CardTitle>
          <span className='text-lg font-medium text-gray-500'>
            Country data from public APIs
          </span>
        </Card>
        <Card className={cn(cardStyle)}>
          <CardTitle>
            <span className={cn('text-3xl font-bold', gradientTextStyle)}>
              Responsive
            </span>
          </CardTitle>
          <span className='text-lg font-medium text-gray-500'>
            Design by TailwindCSS + shadcn/ui
          </span>
        </Card>
        <Card className={cn(cardStyle)}>
          <CardTitle>
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
  );
}

export default HomePage;
