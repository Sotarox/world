import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isLoggedIn: false,
      login: (token) => {
        localStorage.setItem('authToken', token);
        set({ token, isLoggedIn: true });
      },
      logout: () => {
        localStorage.removeItem('authToken');
        set({ token: null, isLoggedIn: false });
      },
    }),
    { name: 'auth-storage' } // persists to localStorage automatically
  )
);
