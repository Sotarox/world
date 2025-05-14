import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

interface AirportInfoCardProps {
  title: string|null;
  value: string|null;
}

function AirportInfoCard(props:AirportInfoProps) {
  const { title, value } = props;
  const Item = styled(Paper)(({ theme }) => ({
       backgroundColor: '#fff',
       padding: theme.spacing(1),
       ...theme.applyStyles('dark', {
         backgroundColor: '#1A2027',
       }),
    }));

  return (
      <Item>
        <Typography variant="h6" style={{ fontWeight: 50 }}>
          {title}
        </Typography>
        <Typography variant="body1" style={{ fontWeight: 500 }}>
          {value}
        </Typography>
      </Item>
  )
}

export default AirportInfoCard
