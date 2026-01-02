import { ACCountryNav } from '@/model/ACCountry';
import { create } from 'zustand';

type CountryNavStoreState = {
  countries: ACCountryNav[];
  setCountries: (countries: ACCountryNav[]) => void;
};

export const useCountryNav = create<CountryNavStoreState>((set) => ({
  countries: [],
  setCountries: (countries) => set(() => ({ countries })),
}));
