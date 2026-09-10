import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/admin-credentials";

// Mock auth store — frontend-only stand-in until a real auth backend is wired up.
interface AdminAuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (email, password) => {
        const ok = email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
        if (ok) set({ isAuthenticated: true });
        return ok;
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    { name: "rustrest-admin-auth" }
  )
);
