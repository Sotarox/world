import React from 'react';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';
import HeaderLogo from './HeaderLogo';
import BurgerMenu from './BurgerMenu';
import { useTheme } from '@mui/material/styles';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from '@/components/custom/sidebar';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/custom/sidebar';
import { PanelLeftIcon } from 'lucide-react';

const DummySidebarTrigger = () => {
  return (
    <Button variant='ghost' size='icon' className='size-10'>
      <PanelLeftIcon />
      <span className='sr-only'>Toggle Sidebar</span>
    </Button>
  );
};

const HeaderBar = React.memo(() => {
  const { isMobile, openMobile } = useSidebar();

  return (
    <div
      className={cn(
        'w-full bg-primary dark:bg-gt-header flex items-center shadow-md',
        // On small screen, Header is fixed at the bottom
        'fixed bottom-0 h-15 top-auto px-3',
        // On larger screen, Header is sticky at the top
        'sm:sticky sm:top-0 sm:min-h-16 sm:px-6'
      )}
      style={{ zIndex: useTheme().zIndex.drawer + 1 }}
    >
      <HeaderLogo />
      {/* When sidebar is open on mobile, click on Trigger makes flashingly opens sidebar again.
       * As a workaround, dummy button is shown */}
      {openMobile && isMobile ? (
        <DummySidebarTrigger />
      ) : (
        <SidebarTrigger className='size-10' />
      )}
      <div className='flex-1' />
      <SearchButton />
      <div className='flex-1' />
      <ThemeSwitch />
      <BurgerMenu />
    </div>
  );
});
HeaderBar.displayName = 'HeaderBar';
export default HeaderBar;
