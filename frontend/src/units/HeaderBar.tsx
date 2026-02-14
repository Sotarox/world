import React from 'react';
import { Box, IconButton } from '@mui/material';
import { List as ListIcon } from 'lucide-react';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';
import HeaderLogo from './HeaderLogo';
import BurgerMenu from './BurgerMenu';
import { useTheme } from '@mui/material/styles';
import { Button } from '../components/ui/button';

interface HeaderBarProps {
  toggleDrawer: () => void;
}

const HeaderBar = React.memo((props: HeaderBarProps) => {
  const { toggleDrawer } = props;

  return (
    <>
      <div
        className='sticky px-6 min-h-16 flex items-center display-none sm:display-block top-0 shadow-md bg-gray-500'
        style={{ zIndex: useTheme().zIndex.drawer + 1 }}
      >
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={toggleDrawer}
        >
          <ListIcon />
        </IconButton>
        <Button variant='secondary' onClick={toggleDrawer}>
          <ListIcon className='size-5' />
        </Button>
        <HeaderLogo />
        <Box sx={{ flexGrow: '1' }} />
        <SearchButton />
        <Box sx={{ flexGrow: '1' }} />
        <ThemeSwitch />
        <BurgerMenu />
      </div>
    </>
  );
});
HeaderBar.displayName = 'HeaderBar';
export default HeaderBar;
