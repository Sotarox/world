import { ACCountryNav } from '@/model/ac-country';
import { create } from 'zustand';

type CountryNavStoreState = {
  countries: ACCountryNav[];
  setCountries: (countries: ACCountryNav[]) => void;
};

export const useCountryNav = create<CountryNavStoreState>((set) => ({
  countries: [],
  setCountries: (countries) => set(() => ({ countries })),
}));
