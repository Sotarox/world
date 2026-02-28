// import { ClientOnly } from './client';
import React from 'react';
import { Link, Typography } from '@mui/material';
import { Card } from '@/components/shadcn/card';
import Image from 'next/image';

export function generateStaticParams() {
  // Only generate the root path as a static param
  // All other routes will be handled client-side by React Router
  return [{ slug: [] }];
}

function HomePage() {
  return (
    <Card className='p-4'>
      <Typography variant='h2' component='h1'>
        Welcome
      </Typography>
      <div className='flex justify-center'>
        <Image
          src='/world-rounded.png'
          alt='World rounded logo'
          width={240}
          height={240}
        />
      </div>
      <div>
        <Typography variant='body1' sx={{ mt: 2, whiteSpace: 'pre-line' }}>
          🌍 This <span className='text-primary font-bold'>World</span> is a
          simple web app that offers various data about countries.
        </Typography>
        <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
          ⛳ The goal is to explore building information system by trying many
          approaches.
        </Typography>
        <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
          💎 Responsive design is supported for smartphone users.
        </Typography>
      </div>
      <Link
        href='https://github.com/Sotarox/world'
        target='_blank'
        rel='noopener'
      >
        Source Code (GitHub)
      </Link>
    </Card>
  );
}

export default HomePage;
