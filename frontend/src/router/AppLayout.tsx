import * as React from 'react';
import HeaderBar from '../units/HeaderBar';
import Sidebar from '../units/Sidebar';
import FloatingRandomButton from '../units/FloatingRandomButton';
import { Outlet } from 'react-router';
import { Box } from '@mui/material';
import { Toaster } from '@/components/ui/sonner';

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const toggleIsSidebarOpen = React.useCallback(
    () => setIsSidebarOpen(!isSidebarOpen),
    [isSidebarOpen]
  );
  return (
    // when mode is dark, tailwind applies corresponding styles to underlying elements
    <div
      className={`bg-neutral-100 dark:bg-neutral-800 font-display min-h-screen`}
    >
      <HeaderBar toggleDrawer={toggleIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={toggleIsSidebarOpen} />
      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
      <FloatingRandomButton />
      <Toaster />
    </div>
  );
}

export default AppLayout;
