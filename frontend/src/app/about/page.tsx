'use client';

import React from 'react';
import Typography from '@mui/material/Typography';
import { Divider, Stack } from '@mui/material';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';

function About() {
  return (
    <>
      <Typography variant='h4'>About</Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      <Typography variant='h5'>Sotaro Shirai</Typography>
      <Stack direction='column' spacing={2} sx={{ ml: 1, mt: 1.5, mb: 1 }}>
        <Avatar className='size-18'>
          <AvatarImage src='/sotaro_profile.jpg' alt='Sotaro' />
          <AvatarFallback>Sotaro</AvatarFallback>
        </Avatar>
      </Stack>
      <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
        {`🥷 Full-stack web developer, borned in Japan 🇯🇵, lives in Stuttgart, Germany 🥨.`}
      </Typography>
      <br />
      <Typography variant='h5' sx={{ mb: 1 }}>
        Technologies in this web service
      </Typography>
      <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
        {`Spring Boot, React, Next.js, TypeScript, Webpack, Tailwind CSS, shadcn/ui, Material UI, PostgresSQL, Docker, Amazon Lightsail, nginx, Ubuntu 

         `}
      </Typography>
      <Typography variant='h5'>Upcoming Features</Typography>
      <ul>
        <li>⚛️ Migration from React to Next.js</li>
        <li>🎨 Migration from Material UI to Tailwind CSS + Shadcn/ui</li>
        <li>🗺️ Map by OpenLayers or Leaflet</li>
        <li>✨ More data from public APIs</li>
        <li>
          ✅ <s>End2End Test</s>{' '}
          <span className='text-gray-500 dark:text-gray-300'> Done</span>
        </li>
      </ul>
    </>
  );
}

export default About;
