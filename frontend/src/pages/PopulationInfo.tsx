import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import InfoCard from '../components/InfoCard';

interface PopulationInfoProps {
  isVisible: boolean;
}

function PopulationInfo(props: PopulationInfoProps) {
  const { isVisible } = props;

  if (isVisible) {
    return (
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={1}>
              <Grid size={{ xs: 6, md: 3 }}>
                <InfoCard title="World rank:" value="N/A"/>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <InfoCard title="Continent rank:" value="N/A"/>
              </Grid>
          </Grid>
        </Box>
      )
  } else {
    return (<></>);
  }
}

export default PopulationInfo
