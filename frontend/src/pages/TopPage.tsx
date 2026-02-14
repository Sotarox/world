import React from 'react';
import { Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Card } from '@/components/ui/card';

function TopPage() {
  const theme = useTheme();
  return (
    <Card className='p-4'>
      <Typography variant='h2' component='h1'>
        Welcome
      </Typography>
      <Typography variant='body1' sx={{ mt: 2, whiteSpace: 'pre-line' }}>
        🌍 This{' '}
        <span
          style={{ fontWeight: 'bold', color: theme.palette.primary.light }}
        >
          World
        </span>{' '}
        is a simple web service that offers various data about countries.
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
export default TopPage;
