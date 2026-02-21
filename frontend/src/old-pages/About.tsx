import React from 'react';
import Typography from '@mui/material/Typography';
import { Divider, Stack } from '@mui/material';
// import profileImageUrl from '../assets/sotaro_profile.jpg';

function About() {
  return (
    <>
      <Typography variant='h4'>About</Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      <Typography variant='h5'>Sotaro Shirai</Typography>
      <Stack direction='column' spacing={2} sx={{ ml: 1, mt: 1.5, mb: 1 }}>
        {/* <Avatar
          alt='Sotaro'
          src={profileImageUrl}
          sx={{ width: 72, height: 72 }}
        /> */}
      </Stack>
      <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
        {`🥷 Full-stack web developer, borned in Japan 🇯🇵, lives in Stuttgart, Germany 🥨.`}
      </Typography>
      <br />
      <Typography variant='h5' sx={{ mb: 1 }}>
        Technologies in this web service
      </Typography>
      <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
        {`Spring Boot, React, TypeScript, Webpack, Tailwind CSS, Material UI, PostgresSQL, Docker, Amazon Lightsail, nginx, Ubuntu 

         `}
      </Typography>
      <Typography variant='h5'>Upcoming Features</Typography>
      <ul>
        <li>🗺️ Map by OpenLayers or Leaflet</li>
        <li>👨‍🦳 CI/CD by Jenkins</li>
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
