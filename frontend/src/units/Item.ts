import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(1),
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export { Item };
