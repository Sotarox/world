import * as React from 'react';
import BottomBar from '../components/BottomBar';
import HeaderBar from '../components/HeaderBar';
import Sidebar from '../components/Sidebar';
import FloatingRandomButton from '../components/FloatingRandomButton';
import { Outlet } from 'react-router';

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const toggleIsSidebarOpen = React.useCallback(
    () => setIsSidebarOpen(!isSidebarOpen),
    [isSidebarOpen]
  );
  return (
    <>
      <HeaderBar toggleDrawer={toggleIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={toggleIsSidebarOpen} />
      <Outlet />
      <FloatingRandomButton />
      <BottomBar toggleDrawer={toggleIsSidebarOpen} />
    </>
  );
}

export default AppLayout;
