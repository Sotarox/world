import * as React from 'react';
import BottomBar from './components/BottomBar';
import HeaderBar from './components/HeaderBar';
import Contents from './pages/Contents';
import Sidebar from './components/Sidebar';

type CurrentIso2ContentType = {
    currentIso2: string,
    setCurrentIso2: React.Dispatch<React.SetStateAction<string>>
  }
const CurrentIso2Context = React.createContext<CurrentIso2ContentType>({
    currentIso2: "N/A",
    setCurrentIso2: () => ""
  });

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState("");
  const toggleIsSidebarOpen = React.useCallback(
    () => setIsSidebarOpen(!isSidebarOpen), [isSidebarOpen]);
  const setSelectedCountryWrapper = React.useCallback(
    (countryIso2: string) => setSelectedCountry(countryIso2), []
  )
  
  const [currentIso2, setCurrentIso2] = React.useState("");

  return (
    <>
      <CurrentIso2Context.Provider
        value={{
          currentIso2,
          setCurrentIso2
        }}
      >
        <HeaderBar toggleDrawer={toggleIsSidebarOpen} />
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={toggleIsSidebarOpen}
          setSelectedCountry={setSelectedCountryWrapper}
        />
        <Contents selectedCountry={selectedCountry} />
        <BottomBar toggleDrawer={toggleIsSidebarOpen} />
      </CurrentIso2Context.Provider>
    </>
  )
}

export default App;
export {CurrentIso2Context};
