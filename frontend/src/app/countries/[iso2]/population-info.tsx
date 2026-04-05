import React from 'react';
import Grid from '@mui/material/Grid';
import InfoCard from '@/components/world/info-card';
import { type PopulationRank } from '@/model/misc';
import { useApi } from '@/api/use-api';
import { Card } from '@/components/shadcn/card';
import { PopulationChart } from '@/components/world/population-chart';
import { ACCountryNav } from '@/model/ac-country';

interface PopulationInfoProps {
  iso2: string;
  continentCode: string;
  data: ACCountryNav[];
  isVisible: boolean;
}

function PopulationInfo(props: PopulationInfoProps) {
  const { iso2, continentCode, data, isVisible } = props;
  if (!isVisible) return null;
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
      <PopulationChart data={data} selectedIso2={iso2} />
    </Card>
  );
}

const formatRankInfo = (rank: number, countCountries: number): string => {
  const order =
    rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th';
  return `${rank}${order} in ${countCountries} countries`;
};

export { PopulationInfo };
