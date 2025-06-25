import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Button, Paper, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { KeyboardArrowRight, KeyboardArrowDown } from '@mui/icons-material';

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
  const theme = useTheme();
  const borderProperties = isSelected
    ? `solid 10px ${theme.palette.secondary.main}`
    : '0px';
  const Icon = isSelected ? <KeyboardArrowDown /> : <KeyboardArrowRight />;
  return (
    <Button
      onClick={() => onClick && onClick()}
      sx={{
        alignItems: 'start',
        padding: 0,
        flexGrow: 1,
        textAlign: 'left',
        textTransform: 'none',
      }}
    >
      <Item
        sx={{
          borderLeft: borderProperties,
          '&:hover': {
            backgroundColor: theme.palette.grey[300],
          },
        }}
      >
        <Stack direction='row' sx={{ alignItems: 'flex-start' }}>
          {Icon}
          <Stack direction='column'>
            <Typography variant='h6'>{title}</Typography>
            <Typography variant='body1' style={{ fontWeight: 500 }}>
              {value}
            </Typography>
          </Stack>
        </Stack>
      </Item>
    </Button>
  );
}

export default ClickbarInfoCard;
