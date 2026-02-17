import React from 'react';
import { PanelLeftIcon } from 'lucide-react';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';
import HeaderLogo from './HeaderLogo';
import BurgerMenu from './BurgerMenu';
import { useTheme } from '@mui/material/styles';
import { Button } from '../components/custom/button';
import { cn } from '@/lib/utils';

interface HeaderBarProps {
  toggleDrawer: () => void;
}

const HeaderBar = React.memo((props: HeaderBarProps) => {
  const { toggleDrawer } = props;

  return (
    <>
      <div
        className={cn(
          'w-full bg-primary dark:bg-gt-header flex items-center shadow-md',
          // On small screen Header is fixed at the bottom
          'fixed bottom-0 h-15 top-auto px-3',
          // On larger screen Header is sticky at the top
          'sm:sticky sm:top-0 sm:min-h-16 sm:px-6'
        )}
        style={{ zIndex: useTheme().zIndex.drawer + 1 }}
      >
        <HeaderLogo />
        <Button variant='ghost' size='icon' onClick={toggleDrawer}>
          <PanelLeftIcon className='size-6' />
        </Button>
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
