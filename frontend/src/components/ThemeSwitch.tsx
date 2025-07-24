import * as React from 'react';
import Switch from '@mui/material/Switch';
import { useThemeContext } from '../contexts/UseThemeContext';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

export default function ThemeSwitch() {
  const [checked, setChecked] = React.useState(true);
  const { toggleColorMode } = useThemeContext();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    toggleColorMode();
  };

  return (
    <>
      <LightModeOutlinedIcon />
      <Switch checked={checked} color={'default'} onChange={handleChange} />
      <DarkModeOutlinedIcon />
    </>
  );
}
