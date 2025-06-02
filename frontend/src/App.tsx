import * as React from 'react';
import BottomBar from './components/BottomBar';
import HeaderBar from './components/HeaderBar';
import Contents from './pages/Contents';
import Sidebar from './components/Sidebar';
import { CurrentIso2ContextProvider } from './contexts/CurrentIso2Context';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const toggleIsSidebarOpen = React.useCallback(
    () => setIsSidebarOpen(!isSidebarOpen), [isSidebarOpen]);

  return (
    <>
      <CurrentIso2ContextProvider>
        <HeaderBar toggleDrawer={toggleIsSidebarOpen} />
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={toggleIsSidebarOpen}
        />
        <Contents />
        <BottomBar toggleDrawer={toggleIsSidebarOpen} />
      </CurrentIso2ContextProvider>
    </>
  )
}

export default App;
