'use client';

import * as React from 'react';
import HeaderBar from '@/components/world/header-bar';
import FloatingRandomButton from '../components/world/floating-random-button';
import { Toaster } from '@/components/shadcn/sonner';
import { SidebarProvider } from '@/components/custom/sidebar';
import { AppSidebar } from '@/components/world/app-sidebar';
import { ThemeProvider } from '@/contexts/theme-provider';

function LayoutHelper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      {/* when mode is dark, tailwind applies corresponding styles to underlying elements */}
      <div
        className={`bg-neutral-100 dark:bg-gt-background font-display min-h-screen`}
      >
        <SidebarProvider>
          <div className='flex flex-col'>
            <HeaderBar />
            <div className='flex w-svw'>
              <AppSidebar />
              <div className='min-w-0 p-4 flex-1'>{children}</div>
            </div>
            <FloatingRandomButton />
            <Toaster />
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  );
}

export default LayoutHelper;
