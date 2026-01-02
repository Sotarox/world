import { create } from 'zustand';
import { Region, RegionType } from '@/model/ACCountry';

type RegionFilterState = {
  enabled: boolean;
  regions: RegionType[];
  addRegion: (region: RegionType) => void;
  setRegions: (regions: RegionType[]) => void;
  removeRegion: (region: RegionType) => void;
};

export const useRegionFilter = create<RegionFilterState>((set) => ({
  enabled: false,
  regions: [...Region],
  addRegion: (region) =>
    set((state) => ({ regions: [...state.regions, region] })),
  setRegions: (regions) => set(() => ({ regions })),
  removeRegion: (region) =>
    set((state) => ({ regions: state.regions.filter((c) => c !== region) })),
}));
