import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/lib/schemas/user';

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,

      setUser: (user) => {
        set({ user });
      },

      setToken: (token) => {
        set({ token });
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      logout: () => {
        set({ user: null, token: null });
      },

      get isAuthenticated() {
        return !!get().token && !!get().user;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
