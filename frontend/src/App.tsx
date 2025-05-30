import * as React from 'react';
import BottomBar from './components/BottomBar';
import HeaderBar from './components/HeaderBar';
import Contents from './pages/Contents';
import Sidebar from './components/Sidebar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState("");
  const toggleIsSidebarOpen = React.useCallback(
    () => setIsSidebarOpen(!isSidebarOpen), [isSidebarOpen]);
  const setSelectedCountryWrapper = React.useCallback(
    (countryIso2:string) => setSelectedCountry(countryIso2), []
  )

  return (
    <>
      <HeaderBar toggleDrawer={toggleIsSidebarOpen}/>
        <Sidebar
          isOpen={isSidebarOpen} 
          setIsOpen={toggleIsSidebarOpen}
          setSelectedCountry={setSelectedCountryWrapper}
        />
        <Contents selectedCountry={selectedCountry}/>
      <BottomBar toggleDrawer={toggleIsSidebarOpen}/>
    </>
  )
}

export default App
