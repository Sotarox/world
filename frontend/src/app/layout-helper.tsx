'use client';

import * as React from 'react';
import HeaderBar from '@/components/world/header-bar';
import { Toaster } from '@/components/shadcn/sonner';
import { SidebarProvider } from '@/components/custom/sidebar';
import { AppSidebar } from '@/components/world/app-sidebar';
import { ThemeProvider } from '@/contexts/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function LayoutHelper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      disableTransitionOnChange
    >
      <div
        className={`bg-neutral-100 dark:bg-gt-background font-display h-dvh overflow-y-auto overscroll-y-none`}
      >
        <QueryClientProvider client={new QueryClient()}>
          <SidebarProvider>
            <div className='flex flex-col'>
              <HeaderBar />
              <div className='flex w-svw sm:pt-16'>
                <AppSidebar />
                <div
                  className='min-w-0 p-4 flex-1 sm:pb-4'
                  style={{
                    paddingBottom:
                      'calc(var(--bottom-bar-height) + env(safe-area-inset-bottom, 0px) + 1rem)',
                  }}
                >
                  {children}
                </div>
              </div>
              <Toaster />
            </div>
          </SidebarProvider>
        </QueryClientProvider>
      </div>
    </ThemeProvider>
  );
}

export default LayoutHelper;
