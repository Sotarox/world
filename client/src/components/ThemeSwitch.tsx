import * as React from 'react';
import Switch from '@mui/material/Switch';
import { useThemeContext } from '../contexts/UseThemeContext';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { styled } from '@mui/material/styles';

export default function ThemeSwitch() {
  const [checked, setChecked] = React.useState(true);
  const { toggleColorMode } = useThemeContext();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    toggleColorMode();
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

const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.primary.main,
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

const IconWrapper = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '50%',
  width: thumbSize,
  height: thumbSize,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
