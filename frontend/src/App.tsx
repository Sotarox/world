import * as React from 'react';
import BottomBar from './components/BottomBar';
import HeaderBar from './components/HeaderBar';
import Contents from './pages/Contents';
import Sidebar from './components/Sidebar';
import { CurrentIso2ContextProvider } from './contexts/CurrentIso2Context';
import { CurrentTopicContextProvider } from './contexts/CurrentTopicContext';
import FloatingRandomButton from './components/FloatingRandomButton';
import { ThemeProvider } from '@emotion/react';
import colorTheme from './utils/colorTheme';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const toggleIsSidebarOpen = React.useCallback(
    () => setIsSidebarOpen(!isSidebarOpen), [isSidebarOpen]);

  return (
    <ThemeProvider theme={colorTheme}>
      <CurrentIso2ContextProvider>
        <CurrentTopicContextProvider>
          <HeaderBar toggleDrawer={toggleIsSidebarOpen} />
          <Sidebar
            isOpen={isSidebarOpen}
            setIsOpen={toggleIsSidebarOpen}
          />
          <Contents />
          <FloatingRandomButton/>
          <BottomBar toggleDrawer={toggleIsSidebarOpen} />
        </CurrentTopicContextProvider>
      </CurrentIso2ContextProvider>
    </ThemeProvider>
  )
}

export default App;
