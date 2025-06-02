import * as React from 'react';
import BottomBar from './components/BottomBar';
import HeaderBar from './components/HeaderBar';
import Contents from './pages/Contents';
import Sidebar from './components/Sidebar';

type CurrentIso2ContentType = {
  currentIso2: string,
}
const CurrentIso2Context = React.createContext<CurrentIso2ContentType>({
  currentIso2: "N/A",
});
type SetCurrentIso2ContentType = {
  setCurrentIso2: React.Dispatch<React.SetStateAction<string>>
}
const SetCurrentIso2Context = React.createContext<SetCurrentIso2ContentType>({
  setCurrentIso2: () => ""
});

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const toggleIsSidebarOpen = React.useCallback(
    () => setIsSidebarOpen(!isSidebarOpen), [isSidebarOpen]);

  const [currentIso2, setCurrentIso2] = React.useState("");

  return (
    <>
      <SetCurrentIso2Context.Provider value={{setCurrentIso2}}>
        <CurrentIso2Context.Provider value={{currentIso2}}>
          <HeaderBar toggleDrawer={toggleIsSidebarOpen} />
          <Sidebar
            isOpen={isSidebarOpen}
            setIsOpen={toggleIsSidebarOpen}
          />
          <Contents />
          <BottomBar toggleDrawer={toggleIsSidebarOpen} />
        </CurrentIso2Context.Provider>
      </SetCurrentIso2Context.Provider>
    </>
  )
}

export default App;
export { SetCurrentIso2Context, CurrentIso2Context };
