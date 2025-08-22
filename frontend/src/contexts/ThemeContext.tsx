import React, { useState, useMemo, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { lightTheme, darkTheme } from '../theme/theme';
import { ThemeContext } from './UseThemeContext';

interface ThemeContextProviderProps {
  children: ReactNode;
}

function ThemeContextProvider(props: ThemeContextProviderProps) {
  const { children } = props;
  // Check user's system preference on initial load
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Initialize mode from localStorage or system preference
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    try {
      const storedMode = localStorage.getItem('themeMode');
      if (storedMode === 'light' || storedMode === 'dark') {
        return storedMode;
      }
    } catch (error) {
      console.error('Failed to read theme from localStorage:', error);
    }
    // Fallback to system preference if no stored mode or error
    return prefersDarkMode ? 'dark' : 'light';
  });

  // Persist mode to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('themeMode', mode);
    } catch (error) {
      console.error('Failed to write theme to localStorage:', error);
    }
  }, [mode]);

  const toggleColorMode = useMemo(
    () => () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
    []
  );

  // Memoize the theme object itself to avoid unnecessary re-renders
  const theme = useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeContextProvider };
