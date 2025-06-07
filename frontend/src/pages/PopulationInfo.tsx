import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import InfoCard from '../components/InfoCard';
import api from '../api/axios';
import { type PopulationRank } from '../model/PopulationRank';

interface PopulationInfoProps {
  isVisible: boolean;
  countryIso2: string;
  continentCode: string;
}

function PopulationInfo(props: PopulationInfoProps) {
  const { countryIso2, continentCode, isVisible } = props;
  const [populationRankWorld, setPopulationRankWorld] = useState<PopulationRank|undefined>();
  const [populationRankContinent, setPopulationRankContinent] = useState<PopulationRank|undefined>();

  useEffect(() => {
    if (isVisible && countryIso2 !== "") {
      api.get<PopulationRank>(`/countries/rank/population/world/${countryIso2}`)
        .then((res) => {
          setPopulationRankWorld(res.data);
        })
        .catch((error) => console.log(error));
      
      api.get<PopulationRank>(`/countries/rank/population/continent/${continentCode}/country/${countryIso2}`)
        .then((res) => {
          setPopulationRankContinent(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [continentCode, countryIso2, isVisible]);

  if (isVisible) {
    return (
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={1}>
              <Grid size={{ xs:12 }}>
                <InfoCard title="Population Information" value=""/>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <InfoCard title="World rank:" 
                  value={populationRankWorld ? populationRankWorld.rank.toString() : "N/A"}/>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <InfoCard title="Continent rank:" 
                  value={populationRankContinent ? 
                    populationRankContinent.rank.toString() : "N/A"}/>
              </Grid>
          </Grid>
        </Box>
      )
  } else {
    return (<></>);
  }
}

export default PopulationInfo
