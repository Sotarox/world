import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  expiresAtEpochMs: number | null;
  isLoggedIn: boolean;
  login: (expiresAtEpochMs: number) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      expiresAtEpochMs: null,
      isLoggedIn: false,
      login: (expiresAtEpochMs) => {
        localStorage.setItem('expiresAtEpochMs', expiresAtEpochMs.toString());
        set({ expiresAtEpochMs, isLoggedIn: true });
      },
      logout: () => {
        localStorage.removeItem('expiresAtEpochMs');
        set({ expiresAtEpochMs: null, isLoggedIn: false });
      },
    }),
    { name: 'auth-storage' } // persists to localStorage automatically
  )
);
