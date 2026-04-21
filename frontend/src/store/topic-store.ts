import { create } from 'zustand';
import { TopicType } from '@/model/misc';

type TopicStoreState = {
  currentTopic: TopicType;
  selectedTopicIndex: number;
  setCurrentTopic: (topic: TopicType) => void;
  toggleCurrentTopic: (topic: TopicType, index: number) => void;
  setSelectedTopicIndex: (index: number) => void;
};

export const useTopicStore = create<TopicStoreState>((set) => ({
  currentTopic: '',
  selectedTopicIndex: -1,
  setCurrentTopic: (topic) => set(() => ({ currentTopic: topic })),
  setSelectedTopicIndex: (index) => set(() => ({ selectedTopicIndex: index })),
  toggleCurrentTopic: (topic, index) =>
    set((state) => ({
      currentTopic: state.currentTopic === topic ? '' : topic,
      selectedTopicIndex: state.currentTopic === topic ? -1 : index,
    })),
}));
