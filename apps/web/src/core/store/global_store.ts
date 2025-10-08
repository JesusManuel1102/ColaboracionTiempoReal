import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GlobalState {
  token: string | null;
  user: {
    username: string;
    email: string;
    bio: string;
    avatarUrl: string;
  } | null;
  isAuthenticated: boolean;
  isOnline: boolean;
  setUser: (user: {
    username: string;
    email: string;
    bio: string;
    avatarUrl: string;
  }) => void;
  setAuth: (token: string) => void;
  logout: () => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isOnline: false,
      isAuthenticated: false,

      setUser: (user) => set({ user }),
      setAuth: (token) =>
        set({ token, isAuthenticated: !!token, isOnline: !!token }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "global-store",
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) =>
          sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);
