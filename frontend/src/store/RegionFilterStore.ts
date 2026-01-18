import { create } from 'zustand';
import { Region, RegionType } from '@/model/ACCountry';
import { persist } from 'zustand/middleware';

type RegionFilterStore = {
  regions: RegionType[];
  setRegions: (regions: RegionType[]) => void;
};

export const useRegionFilter = create<RegionFilterStore>()(
  persist(
    (set) => ({
      regions: [...Region],
      setRegions: (regions) => set(() => ({ regions })),
    }),
    {
      name: 'region-filter-storage',
    }
  )
);
