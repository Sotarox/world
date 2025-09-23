import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, IconButton, Toolbar } from '@mui/material';
import { List as ListIcon } from 'lucide-react';
import AboutButton from './AboutButton';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';
import HeaderLogo from './HeaderLogo';

interface HeaderBarProps {
  toggleDrawer: () => void;
}

const HeaderBar = React.memo((props: HeaderBarProps) => {
  const { toggleDrawer } = props;

  return (
    <>
      <AppBar
        position='sticky'
        sx={{
          display: { xs: 'none', sm: 'block' },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
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
    </>
  );
});
HeaderBar.displayName = 'HeaderBar';
export default HeaderBar;
