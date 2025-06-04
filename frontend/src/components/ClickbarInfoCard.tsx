import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
              backgroundColor: '#fff',
              padding: theme.spacing(1),
              ...theme.applyStyles('dark', {
                backgroundColor: '#1A2027',
              }),
              width: '100%',
           }));

interface ClickbarInfoCardProps {
  title: string | null;
  value: string | null;
  onClick?: () => void;
}

function ClickbarInfoCard(props: ClickbarInfoCardProps) {
  const { title, value, onClick } = props;
  return (
    <Item onClick={() => onClick && onClick()}
      sx={{".MuiPaper-root": {backgroundColor: 'red'}}}
    >
      <Typography variant="h6" style={{ fontWeight: 50 }}>
        {title}
      </Typography>
      <Typography variant="body1" style={{ fontWeight: 500 }}>
        {value}
      </Typography>
    </Item>
  )
}

export default ClickbarInfoCard
