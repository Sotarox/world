import React from 'react';
import { ModeToggle } from './mode-toggle';
import SearchButton from './search-button';
import HeaderLogo from './header-logo';
import BurgerMenu from './burger-menu';
import { useTheme } from '@mui/material/styles';
import { cn } from '@/lib/utils';
import {
  SidebarTrigger,
  DummySidebarTrigger,
} from '@/components/custom/sidebar';
import { useSidebar } from '@/components/custom/sidebar';

const HeaderBar = React.memo(() => {
  const { isMobile, openMobile } = useSidebar();

  return (
    <div
      className={cn(
        'w-full bg-primary dark:bg-gt-header grid grid-cols-3 justify-between content-center shadow-md',
        // On small screen, Header is fixed at the bottom
        'fixed bottom-0 h-15 top-auto px-3',
        // On larger screen, keep header fixed so edge overscroll does not pull it
        'sm:bottom-auto sm:fixed sm:top-0 sm:min-h-16 sm:px-4'
      )}
      style={{ zIndex: useTheme().zIndex.drawer + 1 }}
    >
      <div className='flex items-center gap-1'>
        <HeaderLogo />
        {/* When sidebar is open on mobile, click on Trigger opens sidebar twice flashingly.
         * As a workaround, dummy button is shown */}
        {openMobile && isMobile ? (
          <DummySidebarTrigger />
        ) : (
          <SidebarTrigger className='size-10' />
        )}
      </div>
      <div className='flex justify-center items-center gap-1'>
        <SearchButton />
      </div>
      <div className='flex justify-end items-center gap-2'>
        <ModeToggle />
        <BurgerMenu />
      </div>
    </div>
  );
});
HeaderBar.displayName = 'HeaderBar';
export default HeaderBar;
