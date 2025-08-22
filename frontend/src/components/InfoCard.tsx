import React from 'react';
import Typography from '@mui/material/Typography';

interface InfoCardProps {
  title: string | null;
  value: string | null;
}

function InfoCard(props: InfoCardProps) {
  const { title, value } = props;
  return (
    <div className='flex flex-col p-2'>
      <Typography variant='h6'>{title}</Typography>
      <Typography variant='fatValue'>{value}</Typography>
    </div>
  );
}

export default InfoCard;
export type { InfoCardProps };
