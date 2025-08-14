import { createTheme } from '@mui/material/styles';
import { green, teal } from '@mui/material/colors';

const commonThemeOptions = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fatValue: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 500,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h3: { fontWeight: 300 },
        h4: { fontWeight: 300 },
        h6: { fontWeight: 50 },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: teal[400],
    },
    secondary: {
      main: green[600],
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
});

export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: teal[700],
    },
    secondary: {
      main: green[800],
    },
    background: {
      default: '#212121',
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    },
  },
});
