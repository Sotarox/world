import React from 'react';
import { Grid } from '@mui/material';
import type { InfoCardProps } from './InfoCard';
import InfoCard from './InfoCard';

interface GridInfoProps extends InfoCardProps {
  gridProps: object;
}
function GridInfo(props: GridInfoProps) {
  const { title, value, gridProps } = props;

  return (
    <Grid {...gridProps}>
      <InfoCard title={title} value={value} />
    </Grid>
  );
}
export default GridInfo;
