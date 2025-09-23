import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, IconButton, Toolbar } from '@mui/material';
import { List as ListIcon } from 'lucide-react';
import AboutButton from './AboutButton';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';
import HeaderLogo from './HeaderLogo';

interface BottomBarProps {
  toggleDrawer: () => void;
}

export default function BottomBar(props: BottomBarProps) {
  const { toggleDrawer } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        sx={{
          top: 'auto',
          bottom: 0,
          height: '80px',
          display: { xs: 'block', sm: 'none' },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={toggleDrawer}
          >
            <ListIcon />
          </IconButton>
          <HeaderLogo />
          <Box sx={{ flexGrow: '1' }} />
          <SearchButton />
          <Box sx={{ flexGrow: '1' }} />
          <ThemeSwitch />
          <AboutButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
