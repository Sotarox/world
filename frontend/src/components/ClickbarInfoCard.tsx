import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Button, Paper } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
              backgroundColor: '#fff',
              padding: theme.spacing(1),
              ...theme.applyStyles('dark', {
                backgroundColor: '#1A2027',
              }),
              width: '100%',
           }));

interface ClickbarInfoCardProps {
  isSelected?: boolean;
  title: string | null;
  value: string | null;
  onClick?: () => void;
}

function ClickbarInfoCard(props: ClickbarInfoCardProps) {
  const { isSelected, title, value, onClick } = props;
  const borderProperties = isSelected ? 'solid 10px gray': '0px';
  return (
    <Button onClick={() => onClick && onClick()} 
      sx={{alignItems:'start', padding: 1, flexGrow: 1, textAlign: 'left', textTransform: 'none'}}>
      <Item sx={{ borderLeft: borderProperties }}>
        <Typography variant="h6" style={{ fontWeight: 50 }}>
          {title}
        </Typography>
        <Typography variant="body1" style={{ fontWeight: 500 }}>
          {value}
        </Typography>
      </Item>
    </Button>
  )
}

export default ClickbarInfoCard
