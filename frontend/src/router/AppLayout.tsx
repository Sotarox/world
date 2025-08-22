import * as React from 'react';
import BottomBar from '../components/BottomBar';
import HeaderBar from '../components/HeaderBar';
import Sidebar from '../components/Sidebar';
import FloatingRandomButton from '../components/FloatingRandomButton';
import { Outlet } from 'react-router';
import { Box } from '@mui/material';
import { useThemeContext } from '../contexts/UseThemeContext';

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const toggleIsSidebarOpen = React.useCallback(
    () => setIsSidebarOpen(!isSidebarOpen),
    [isSidebarOpen]
  );
  const mode = useThemeContext().mode;
  return (
    // when mode is dark, tailwind applies corresponding styles to underlying elements
    <div className={`${mode} dark:bg-neutral-800 font-display min-h-screen`}>
      <HeaderBar toggleDrawer={toggleIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={toggleIsSidebarOpen} />
      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
      <FloatingRandomButton />
      <BottomBar toggleDrawer={toggleIsSidebarOpen} />
    </div>
  );
}

export default AppLayout;
