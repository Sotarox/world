// import { ClientOnly } from './client';
import React from 'react';
import { Link, Typography } from '@mui/material';
import { Card } from '@/components/ui/card';

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
      <Typography variant='body1' sx={{ mt: 2, whiteSpace: 'pre-line' }}>
        🌍 This <span className='text-primary font-bold'>World</span> is a
        simple web service that offers various data about countries.
      </Typography>
      <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
        {`
          🐣 The current version is in alpha, which means only limited information is available.

          👓 The goal is to create a lightweight information system where users can quickly gather key data.

          💎 UX theme: “Look & feel from shopping sites for informative content”.
        `}
      </Typography>
      <br />
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
