import Typography from '@mui/material/Typography';
import { Item } from '../components/Item';

interface InfoCardProps {
  title: string | null;
  value: string | null;
}

function InfoCard(props: InfoCardProps) {
  const { title, value } = props;
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

export default InfoCard
