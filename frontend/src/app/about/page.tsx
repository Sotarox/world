'use client';

import React from 'react';
import Typography from '@mui/material/Typography';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import { Card } from '@/components/shadcn/card';

function About() {
  return (
    <Card className='p-4'>
      <Typography variant='h4'>About</Typography>
      <div className='flex flex-col gap-4 w-full sm:w-fit'>
        <Typography variant='h5'>Sotaro Shirai</Typography>
        <Avatar className='size-18 self-center'>
          <AvatarImage src='/sotaro_profile.jpg' alt='Sotaro' />
          <AvatarFallback>Sotaro</AvatarFallback>
        </Avatar>
      </div>
      <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
        {`🥷 Web developer, borned in Japan 🇯🇵, lives in Stuttgart, Germany 🥨.`}
      </Typography>
      <Typography variant='h5'>Technologies in this web service</Typography>
      <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
        {`Spring Boot, React, Next.js, TypeScript, Webpack, Tailwind CSS, shadcn/ui, Material UI, PostgresSQL, Docker, Amazon Lightsail, nginx, Ubuntu `}
      </Typography>
      <Typography variant='h5'>Upcoming Features</Typography>
      <ul>
        <li>
          ⚛️ <s>Migration from React to Next.js</s>
          <span className='text-gray-500 dark:text-gray-300'>
            {' '}
            ... Now running in Next.js&apos;s SSG mode
          </span>
        </li>
        <li>🗺️ Map by OpenLayers or Leaflet</li>
        <li>✨ More data from public APIs</li>
        <li>
          ✅ <s>End2End Test</s>{' '}
          <span className='text-gray-500 dark:text-gray-300'> ... Done</span>
        </li>
      </ul>
    </Card>
  );
}

export default About;
