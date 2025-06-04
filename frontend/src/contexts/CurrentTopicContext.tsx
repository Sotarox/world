import React, { createContext, useState } from 'react';

type TopicType = ""|"population"|"airports";

type CurrentTopicContentType = {
  currentTopic: TopicType,
  setCurrentTopic: React.Dispatch<React.SetStateAction<TopicType>>
}
const CurrentTopicContext = createContext<CurrentTopicContentType>({
  currentTopic: "",
  setCurrentTopic: () => ""
});

function CurrentTopicContextProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const [currentTopic, setCurrentTopic] = useState<TopicType>("");

  return (
    <CurrentTopicContext.Provider value={{currentTopic, setCurrentTopic}}>
        {children}
    </CurrentTopicContext.Provider>
  );
};

export { CurrentTopicContextProvider, CurrentTopicContext };