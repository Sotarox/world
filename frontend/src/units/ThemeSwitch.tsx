import * as React from 'react';
import Switch from '@mui/material/Switch';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { styled } from '@mui/material/styles';
import { useTheme } from '@/theme/theme-provider';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = React.useState(theme === 'dark');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setTheme(event.target.checked ? 'dark' : 'light');
  };

  return (
    <>
      <CustomSwitch
        checked={checked}
        color={'default'}
        icon={
          <IconWrapper>
            <LightModeRoundedIcon sx={{ fontSize: 16 }} />
          </IconWrapper>
        }
        checkedIcon={
          <IconWrapper>
            <DarkModeRoundedIcon sx={{ fontSize: 16 }} />
          </IconWrapper>
        }
        onChange={handleChange}
      />
    </>
  );
}

const thumbSize = 20;

const CustomSwitch = styled(Switch)(() => ({
  '& .MuiSwitch-thumb': {
    backgroundColor: 'var(--color-teal-500)',
    width: thumbSize,
    height: thumbSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      fontSize: 16,
      color: '#fff',
    },
  },
}));

const IconWrapper = styled('span')(() => ({
  backgroundColor: 'var(--color-teal-600)',
  borderRadius: '50%',
  width: thumbSize,
  height: thumbSize,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
