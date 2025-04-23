import { create } from 'zustand';

interface UIStore {
  isSidebarOpen: boolean;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  toggleSidebar: () => void;
  toggleCart: () => void;
  toggleSearch: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  isSidebarOpen: false,
  isCartOpen: false,
  isSearchOpen: false,
  theme: 'system',

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),

  setTheme: (theme) => set({ theme }),
}));
