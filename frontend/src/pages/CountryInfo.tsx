import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import { type Country } from '../model/Country';
import Box from '@mui/material/Box';
import { Item } from '../components/Item';
import InfoCard from '../components/InfoCard';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { convertContinentCodeToName, formatNumberWithComma } from '../utils/utils';
import { CircleFlag } from 'react-circle-flags'
import { CurrentTopicContext } from '../contexts/CurrentTopicContext';
import ClickbarInfoCard from '../components/ClickbarInfoCard';

interface CountryInfoProps {
  country: Country;
  sizeAirports: number;
}
function CountryInfo(props: CountryInfoProps) {
  const { country, sizeAirports } = props;
  const { currentTopic, setCurrentTopic } = useContext(CurrentTopicContext);

  return (
    <Box sx={{ mt: 2 }}>
      <Item sx={{ mb: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: 1.5 }}>
        <CircleFlag countryCode={country.countryIso2.toLowerCase()} height="50" />
        <Typography variant="h2" sx={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>{country.countryName}</Typography>
      </Item>
      <Grid container spacing={0.125}>
        <Grid size={{ xs: 6, md: 3 }} sx={{ p:1 }}>
          <InfoCard title="Capital" value={country.capital} />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }} sx={{ p:1 }}>
          <InfoCard title="Continent" value={convertContinentCodeToName(country.continent)} />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }} sx={{ p:1 }}>
          <InfoCard title="Country ISO2" value={country.countryIso2} />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }} sx={{ p:1 }}>
          <InfoCard title="Country ISO3" value={country.countryIso3} />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }} sx={{ p:1 }}>
          <InfoCard title="Currency" value={country.currencyName} />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }} sx={{ p:1 }}>
          <InfoCard title="Phone prefix" value={country.phonePrefix} />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }} sx={{ display: "flex" }}>
          <ClickbarInfoCard title="Population" value={formatNumberWithComma(country.population)} 
            isSelected={currentTopic === "population"} onClick={() => setCurrentTopic("population")} />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }} sx={{ display: "flex" }}>
          <ClickbarInfoCard title="The number of airports" value={sizeAirports.toString()} 
            isSelected={currentTopic === "airports"} onClick={() => setCurrentTopic("airports")} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default CountryInfo;
