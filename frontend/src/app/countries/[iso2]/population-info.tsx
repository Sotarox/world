import { useApi } from '@/api/use-api';
import { Card } from '@/components/world/card';
import InfoCard from '@/components/world/info-card';
import { PopulationChartLoad } from '@/components/world/population-chart-load';
import { type PopulationRank } from '@/model/misc';
import { formatRankInfo } from '@/utils/utils';
import Grid from '@mui/material/Grid';

interface PopulationInfoProps {
  iso2: string;
  continentCode: string;
}

function PopulationInfo(props: PopulationInfoProps) {
  const { iso2, continentCode } = props;
  const { data: populationRankWorld } = useApi<PopulationRank>(
    `/countries/rank/population/world/${iso2}`
  );
  const { data: populationRankContinent } = useApi<PopulationRank>(
    `/countries/rank/population/continent/${continentCode}/country/${iso2}`
  );

  return (
    <Card className='p-4'>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12 }} sx={{ paddingX: 1 }}>
          <span className='text-lg font-extralight'>Population</span>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <InfoCard
            title='World:'
            value={
              populationRankWorld
                ? formatRankInfo(
                    populationRankWorld.rank,
                    populationRankWorld.countCountries
                  )
                : 'N/A'
            }
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <InfoCard
            title='Continent:'
            value={
              populationRankContinent
                ? formatRankInfo(
                    populationRankContinent.rank,
                    populationRankContinent.countCountries
                  )
                : 'N/A'
            }
          />
        </Grid>
      </Grid>
      <PopulationChartLoad iso2={iso2} />
    </Card>
  );
}

export { PopulationInfo };
