import React from 'react';
import Grid from '@mui/material/Grid';
import InfoCard from '../../../components/world/InfoCard';
import { type PopulationRank } from '../../../model/PopulationRank';
import useApi from '../../../api/useApi';

interface PopulationInfoProps {
  countryIso2: string;
  continentCode: string;
}

function PopulationInfo(props: PopulationInfoProps) {
  const { countryIso2, continentCode } = props;
  const populationRankWorld = useApi<PopulationRank>(
    `/countries/rank/population/world/${countryIso2}`
  );
  const populationRankContinent = useApi<PopulationRank>(
    `/countries/rank/population/continent/${continentCode}/country/${countryIso2}`
  );

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12 }}>
        <InfoCard title='Population ranking' value='' />
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
  );
}

const formatRankInfo = (rank: number, countCountries: number): string => {
  const order =
    rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th';
  return `${rank}${order} in ${countCountries} countries`;
};

export { PopulationInfo };
