import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { InfoCardEntry } from '@/model/country';

export const defaultInfoCards: InfoCardEntry[] = [
  { index: 0, title: 'Region' },
  { index: 1, title: 'Subregion' },
  { index: 2, title: 'Coordinate' },
  { index: 3, title: 'Capital' },
  { index: 4, title: 'Country ISO2' },
  { index: 5, title: 'Country ISO3' },
  { index: 6, title: 'Top domain' },
  { index: 7, title: 'Phone prefix' },
  { index: 8, title: 'Currency' },
  { index: 9, title: 'Independent' },
  { index: 10, title: 'Language' },
  { index: 11, title: 'Time zone' },
];

type SortableInfoCardStore = {
  infoCards: InfoCardEntry[];
  setInfoCards: (infoCards: InfoCardEntry[]) => void;
};

export const useSortableInfoCard = create<SortableInfoCardStore>()(
  persist(
    (set) => ({
      infoCards: defaultInfoCards,
      setInfoCards: (infoCards) => set(() => ({ infoCards })),
    }),
    {
      name: 'sortable-info-card-storage',
    }
  )
);
