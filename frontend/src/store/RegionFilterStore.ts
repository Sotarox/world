import { create } from 'zustand';

export const Region = [
  'Africa',
  'Americas',
  'Antarctic',
  'Antarctic Ocean',
  'Asia',
  'Europe',
  'Oceania',
  'Polar',
] as const;
export type RegionType = (typeof Region)[number];

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
