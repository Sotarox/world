import * as React from 'react';
import BottomBar from './components/BottomBar';
import HeaderBar from './components/HeaderBar';
import Contents from './pages/Contents';
import Sidebar from './components/Sidebar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <>
      <HeaderBar toggleDrawer={()=>setIsSidebarOpen(!isSidebarOpen)}/>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={() => setIsSidebarOpen(!isSidebarOpen)}/>
        <Contents/>
      <BottomBar/>
    </>
  )
}

export default App
