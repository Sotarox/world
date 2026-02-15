import React from 'react';
import { PanelLeftIcon } from 'lucide-react';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';
import HeaderLogo from './HeaderLogo';
import BurgerMenu from './BurgerMenu';
import { useTheme } from '@mui/material/styles';
import { Button } from '../components/custom/button';

interface HeaderBarProps {
  toggleDrawer: () => void;
}

const HeaderBar = React.memo((props: HeaderBarProps) => {
  const { toggleDrawer } = props;

  return (
    <>
      <div
        className='sticky bg-primary px-6 min-h-16 flex items-center display-none sm:display-block top-0 shadow-md'
        style={{ zIndex: useTheme().zIndex.drawer + 1 }}
      >
        <Button variant='ghost' size='icon' onClick={toggleDrawer}>
          <PanelLeftIcon className='size-6' />
        </Button>
        <HeaderLogo />
        <div className='flex-1' />
        <SearchButton />
        <div className='flex-1' />
        <ThemeSwitch />
        <BurgerMenu />
      </div>
    </>
  );
});
HeaderBar.displayName = 'HeaderBar';
export default HeaderBar;
