import * as React from 'react';
import BottomBar from './components/BottomBar';
import HeaderBar from './components/HeaderBar';
import Contents from './pages/Contents';
import Sidebar from './components/Sidebar';
import FloatingRandomButton from './components/FloatingRandomButton';

function Frame() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const toggleIsSidebarOpen = React.useCallback(
    () => setIsSidebarOpen(!isSidebarOpen),
    [isSidebarOpen]
  );

  return (
    <>
      <HeaderBar toggleDrawer={toggleIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={toggleIsSidebarOpen} />
      <Contents />
      <FloatingRandomButton />
      <BottomBar toggleDrawer={toggleIsSidebarOpen} />
    </>
  );
}

export default Frame;
