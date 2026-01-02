import { Box, IconButton, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { List as ListIcon } from 'lucide-react';
import BurgerMenu from './BurgerMenu';
import HeaderLogo from './HeaderLogo';
import SearchButton from './SearchButton';
import ThemeSwitch from './ThemeSwitch';

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
          <BurgerMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
