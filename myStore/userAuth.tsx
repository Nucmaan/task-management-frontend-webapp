import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface UserAuthState {
  user: User | null;
  loginUser: (user: User) => void;
  logoutUser: () => void;
  updateUser: (updatedUser: User) => void;
}

const userAuth = create<UserAuthState>()(
  persist(
    (set) => ({
      user: null,
      loginUser: (user) => set({ user }),
      logoutUser: () => set({ user: null }),
      updateUser: (updatedUser) => set({ user: updatedUser }),
    }),
    {
      name: "Astan-storage",
      getStorage: () => localStorage,
    }
  )
);

export default userAuth;
