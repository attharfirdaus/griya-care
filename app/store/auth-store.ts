import { create } from "zustand";

export type User = {
  id: string;
  email: string;
  name?: string;
  role?: string;
  accessToken?: string;
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
