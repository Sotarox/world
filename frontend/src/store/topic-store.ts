import { create } from 'zustand';
import { TopicType } from '@/model/misc';

type TopicStoreState = {
  currentTopic: TopicType;
  setCurrentTopic: (topic: TopicType) => void;
  toggleCurrentTopic: (topic: TopicType) => void;
};

export const useTopicStore = create<TopicStoreState>((set) => ({
  currentTopic: '',
  setCurrentTopic: (topic) => set(() => ({ currentTopic: topic })),
  toggleCurrentTopic: (topic) =>
    set((state) => ({
      currentTopic: state.currentTopic === topic ? '' : topic,
    })),
}));
