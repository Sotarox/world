'use client';

import * as React from 'react';
import HeaderBar from '@/units/HeaderBar';
import FloatingRandomButton from '../units/FloatingRandomButton';
import { Toaster } from '@/components/shadcn/sonner';
import { SidebarProvider } from '@/components/custom/sidebar';
import { AppSidebar } from '@/units/AppSidebar';
import { ThemeProvider } from '@/theme/theme-provider';
import { CurrentTopicContextProvider } from '@/contexts/CurrentTopicContext';

function LayoutHelper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <CurrentTopicContextProvider>
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
      </CurrentTopicContextProvider>
    </ThemeProvider>
  );
}

export default LayoutHelper;
