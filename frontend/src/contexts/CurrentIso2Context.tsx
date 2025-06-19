import React, { createContext, useState } from 'react';

type CurrentIso2ContentType = {
  currentIso2: string;
};
const CurrentIso2Context = createContext<CurrentIso2ContentType>({
  currentIso2: 'N/A',
});
type SetCurrentIso2ContentType = {
  setCurrentIso2: React.Dispatch<React.SetStateAction<string>>;
};
const SetCurrentIso2Context = createContext<SetCurrentIso2ContentType>({
  setCurrentIso2: () => '',
});

function CurrentIso2ContextProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const [currentIso2, setCurrentIso2] = useState('');

  return (
    <CurrentIso2Context.Provider value={{ currentIso2 }}>
      <SetCurrentIso2Context.Provider value={{ setCurrentIso2 }}>
        {children}
      </SetCurrentIso2Context.Provider>
    </CurrentIso2Context.Provider>
  );
}

export {
  CurrentIso2ContextProvider,
  SetCurrentIso2Context,
  CurrentIso2Context,
};
