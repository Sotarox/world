import * as React from 'react';
import HeaderBar from '../units/HeaderBar';
// import Sidebar from '../units/Sidebar';
import FloatingRandomButton from '../units/FloatingRandomButton';
import { Outlet } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/units/AppSidebar';

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const toggleIsSidebarOpen = React.useCallback(
    () => setIsSidebarOpen(!isSidebarOpen),
    [isSidebarOpen]
  );
  return (
    // when mode is dark, tailwind applies corresponding styles to underlying elements
    <SidebarProvider>
      <div
        className={`bg-neutral-100 dark:bg-gt-background font-display min-h-screen flex flex-col`}
      >
        <HeaderBar toggleDrawer={toggleIsSidebarOpen} />
        {/* <Sidebar isOpen={isSidebarOpen} setIsOpen={toggleIsSidebarOpen} /> */}
        <div className='flex p-2'>
          <AppSidebar />
          <SidebarTrigger className='size-10' />
          <Outlet />
        </div>
        <FloatingRandomButton />
        <Toaster />
      </div>
    </SidebarProvider>
  );
}

export default AppLayout;
