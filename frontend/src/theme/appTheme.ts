import { createTheme } from '@mui/material/styles';
import { green, teal } from '@mui/material/colors';

const appTheme = createTheme({
  typography: {
    fatValue: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 500,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h3: {
          fontWeight: 300,
        },
        h4: {
          fontWeight: 300,
        },
        h6: {
          fontWeight: 50,
        },
      },
    },
  },
  palette: {
    primary: {
      main: teal[400],
    },
    secondary: {
      main: green[600],
    },
  },
});
export default appTheme;
