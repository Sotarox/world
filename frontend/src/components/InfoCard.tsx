import React from 'react';
import Typography from '@mui/material/Typography';

interface InfoCardProps {
  title: string | null;
  value: string | null;
}

function InfoCard(props: InfoCardProps) {
  const { title, value } = props;
  return (
    <>
      <Typography variant='h6'>{title}</Typography>
      <Typography variant='fatValue'>{value}</Typography>
    </>
  );
}

export default InfoCard;
export type { InfoCardProps };
