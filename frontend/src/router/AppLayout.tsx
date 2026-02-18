import * as React from 'react';
import HeaderBar from '../units/HeaderBar';
import FloatingRandomButton from '../units/FloatingRandomButton';
import { Outlet } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
import { SidebarProvider } from '@/components/custom/sidebar';
import { AppSidebar } from '@/units/AppSidebar';

function AppLayout() {
  return (
    // when mode is dark, tailwind applies corresponding styles to underlying elements
    <div
      className={`bg-neutral-100 dark:bg-gt-background font-display min-h-screen`}
    >
      <SidebarProvider>
        <div className='flex flex-col w-full'>
          <HeaderBar />
          <div className='flex'>
            <AppSidebar />
            <div className='p-4'>
              <Outlet />
            </div>
          </div>
          <FloatingRandomButton />
          <Toaster />
        </div>
      </SidebarProvider>
    </div>
  );
}

export default AppLayout;
