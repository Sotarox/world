import { Card } from '@/components/world/card';
import { AreaChartLoad } from '@/components/world/population-chart-load copy';
import Grid from '@mui/material/Grid';

interface AreaInfoProps {
  iso2: string;
}

function AreaInfo(props: AreaInfoProps) {
  const { iso2 } = props;

  return (
    <Card className='p-4'>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12 }} sx={{ paddingX: 1 }}>
          <span className='text-lg font-extralight'>Area</span>
        </Grid>
      </Grid>
      <AreaChartLoad iso2={iso2} />
    </Card>
  );
}

export { AreaInfo };
