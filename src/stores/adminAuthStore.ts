import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminAuthStore {
  adminAuth: {
    is_authorized: boolean;
    authorization_status: 'PENDING' | 'AUTHORIZED' | 'EXPIRED';
    authorized_at?: string;
    expires_at?: string;
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
