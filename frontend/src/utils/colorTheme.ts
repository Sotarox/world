import { createTheme } from '@mui/material/styles';
import { green, teal } from '@mui/material/colors';

const colorTheme = createTheme({
  palette: {
    primary: {
      main: teal[400],
    },
    secondary: {
      main: green[600],
    },
  },
});
export default colorTheme;
