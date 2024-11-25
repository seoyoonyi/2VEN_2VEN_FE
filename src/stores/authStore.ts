import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@/types/auth';

// 로그인 성공 시 JWT 토큰과 함께 role 정보를 여기에 useAuthStore에 저장
interface AuthStore {
  token: string | null;
  user: User | null; // 로그인한 사용자 정보
  setAuth: (token: string, user: User) => void;
  signout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      signout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
