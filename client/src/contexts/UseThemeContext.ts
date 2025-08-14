import { createContext, useContext } from 'react';

interface ThemeContextProps {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      'useThemeContext must be used within a ThemeContextProvider'
    );
  }
  return context;
};
