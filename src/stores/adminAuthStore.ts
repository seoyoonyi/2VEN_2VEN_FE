import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminAuthStore {
  adminAuth: {
    authorized: boolean;
    authorizationStatus: 'PENDING' | 'AUTHORIZED' | 'EXPIRED';
    authorizedAt?: string;
    expiresAt?: string;
  } | null;
  setAdminAuth: (auth: AdminAuthStore['adminAuth']) => void;
  clearAdminAuth: () => void;
}

export const useAdminAuthStore = create<AdminAuthStore>()(
  persist(
    (set) => ({
      adminAuth: null,
      setAdminAuth: (auth) => set({ adminAuth: auth }),
      clearAdminAuth: () => set({ adminAuth: null }),
    }),
    { name: 'admin-auth' }
  )
);
